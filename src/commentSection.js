import { isAuthenticated, getUser, signIn, signOut } from "./oidc-client-ts.js";
import { config } from "./config.js";

document.addEventListener('alpine:init', () => {
    Alpine.data('commentSection', () => {
        const section = document.querySelector('[data-post-slug]');
        const slug = section ? section.dataset.postSlug : '';
        const endpointUrl = `${config.api.endpoint}/${slug}`;

        function timeAgo(seconds, secondsPerUnit) {
            return Math.floor(seconds / secondsPerUnit);
        }

        return {
            comments: [],
            loadingComments: true,
            signingIn: false,
            posting: false,
            deletingId: null,
            isAuthenticated: false,
            currentUser: null,
            userName: null,
            content: "",

            formatDate(timestamp) {
                const date = new Date(timestamp * 1000);
                const now = new Date();
                const seconds = Math.floor((now - date) / 1000);

                if (seconds < 60) return 'just now';
                if (seconds < 3600) {
                    const minutes = timeAgo(seconds, 60);
                    return `${minutes} minutes ago`;
                };
                if (seconds < 86400) {
                    const hours = timeAgo(seconds, 3600);
                    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
                }
                if (seconds < 604800) {
                    const days = timeAgo(seconds, 86400);
                    return days === 1 ? "1 day ago" : `${days} days ago`;
                };

                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            },

            async init() {
                this.isAuthenticated = await isAuthenticated();

                if (this.isAuthenticated) {
                    this.currentUser = await getUser();
                    console.log('Current user:', this.currentUser);
                    console.log('User sub:', this.currentUser?.profile?.sub);
                    if (this.currentUser?.profile?.name) {
                        this.userName = this.currentUser.profile.name;
                    } else if (this.currentUser?.profile?.email) {
                        this.userName = this.currentUser.profile.email;
                    }
                }

                try {
                    const response = await fetch(`${endpointUrl}/comments`);
                    const data = await response.json();
                    this.comments = data;
                    console.log('Comments:', this.comments);
                    this.loadingComments = false;
                } catch (error) {
                    console.error('Failed to load comments:', error);
                    this.loadingComments = false;
                }
            },

            async handleSignIn() {
                this.signingIn = true;
                await signIn();
            },

            async handleSignOut() {
                await signOut();
            },

            async postComment() {
                this.posting = true;
                try {
                    const response = await fetch(`${endpointUrl}/comments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.currentUser?.id_token}`,
                        },
                        body: JSON.stringify({ content: this.content })
                    });

                    if (!response.ok) {
                        console.error('Failed to post comment:', response.status);
                        return;
                    }

                    await this.init();
                    this.content = "";
                } catch (error) {
                    console.error("Failed to post comment:", error);
                } finally {
                    this.posting = false;
                }
            },

            async deleteComment(commentId) {
                this.deletingId = commentId;
                try {
                    await fetch(`${endpointUrl}/comments/${commentId}`, {
                        method: "DELETE",
                        headers: {"Authorization": `Bearer ${this.currentUser?.id_token}`}
                    });
                    await this.init();
                } catch (error) {
                    console.error("Failed to delete comment:", error);
                } finally {
                    this.deletingId = null;
                }
            }
        }
    });
});