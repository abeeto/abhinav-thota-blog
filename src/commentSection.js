function commentSection() {
    // Get slug from data attribute on the section element
    const section = document.querySelector('[data-post-slug]');
    const slug = section ? section.dataset.postSlug : '';
    const endpointUrl = `https://b3dzupshhe.execute-api.eu-west-2.amazonaws.com/dev/blog/${slug}`;

    function timeAgo(seconds, secondsPerUnit) {
        return Math.floor(seconds / secondsPerUnit);
    }

    return {
        comments: [],
        loading: true,
        newComment: "",
        error: "",

        idToken: null,
        userInfo: null,

        get isAuthenticated() {
            return cognitoAuth.isAuthenticated();
        },

        get userName() {
            return this.userInfo?.name || this.userInfo?.email || 'Anonymous';
        },

        get userId() {
            return this.userInfo?.sub || null;
        },

        get canPost() {
            return this.isAuthenticated &&
                this.newComment.trim().length > 0 &&
                this.newComment.trim().length <= 1000;
        },



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
            await cognitoAuth.handleCallback();

            if (this.isAuthenticated) {
                this.idToken = cognitoAuth.getIdToken();
                this.userInfo = cognitoAuth.getUserInfo();
            }

            try {
                const response = await fetch(`${endpointUrl}/comments`);
                const data = await response.json();
                this.comments = data;
                this.loading = false;
            } catch (error) {
                console.error('Failed to load comments:', error);
                this.loading = false;
            }
        },

        signIn() {
            cognitoAuth.signIn();
        },

        signOut() {
            cognitoAuth.signOut();
        },
        async postComment() {
            if (!this.isAuthenticated) {
                this.error = "Please sign in to post a comment";
                return;
            }

            try {
                const comment = {
                    userName: this.userName,
                    content: this.newComment
                };

                await fetch(`${endpointUrl}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.idToken}`
                    },
                    body: JSON.stringify(comment)
                });

                this.newComment = "";
                this.error = "";
                await this.init();
            } catch (error) {
                console.error("failed to post comment: ", error);
                this.error = "Failed to post comment. Please try again.";
            }
        },
        async deleteComment(commentId) {
            if (!this.isAuthenticated) {
                return;
            }

            try {
                await fetch(`${endpointUrl}/comments/${commentId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${this.idToken}`
                    }
                });
                await this.init();
            } catch (error) {
                console.error("failed to delete:", error);
            }
        }
    }
}