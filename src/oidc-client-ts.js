import { UserManager } from "https://cdn.jsdelivr.net/npm/oidc-client-ts@3.4.1/+esm";
import { config } from "./config.js";

const cognitoAuthConfig = {
    authority: config.cognito.authority,
    client_id: config.cognito.clientId,
    redirect_uri: window.location.origin,
    post_logout_redirect_uri: window.location.origin,
    response_type: "code",
    scope: "email openid profile",
    loadUserInfo: true,
    automaticSilentRenew: true
};

export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

// Check if user is authenticated
export async function isAuthenticated() {
    try {
        const user = await userManager.getUser();
        return user != null && !user.expired;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

// Get current user
export async function getUser() {
    try {
        return await userManager.getUser();
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Sign in - use built-in state management
export async function signIn() {
    try {
        await userManager.signinRedirect({
            state: { returnUrl: window.location.pathname }
        });
    } catch (error) {
        console.error('Error during sign in:', error);
    }
}

// Handle the redirect callback from Cognito
export async function handleCallback() {
    try {
        const user = await userManager.signinRedirectCallback();
        const returnUrl = user.state?.returnUrl || '/';
        window.location.href = returnUrl;
        return user;
    } catch (error) {
        console.error('Error handling callback:', error);
        window.location.href = '/?auth_error=1';
    }
}

// Sign out - Cognito doesn't support standard OIDC logout, so we use custom URL
export async function signOut() {
    try {
        sessionStorage.setItem('returnUrl', window.location.pathname);
        await userManager.removeUser();

        const logoutUri = encodeURIComponent(window.location.origin);
        window.location.href = `${config.cognito.domain}/logout?client_id=${config.cognito.clientId}&logout_uri=${logoutUri}`;
    } catch (error) {
        console.error('Error during sign out:', error);
    }
}

// Initialize auth - check for callback on page load
export async function initAuth() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('code')) {
        await handleCallback();
    } else if (!await isAuthenticated() && sessionStorage.getItem('returnUrl')) {
        const returnUrl = sessionStorage.getItem('returnUrl');
        sessionStorage.removeItem('returnUrl');
        if (returnUrl !== window.location.pathname) {
            window.location.href = returnUrl;
        }
    }
}