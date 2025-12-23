const COGNITO_CONFIG = {
    userPoolId: 'eu-west-2_38vTy451n',
    clientId: '6l559rodf3c4vi9iil9sqq0vkd',
    domain: 'https://eu-west-238vty451n.auth.eu-west-2.amazoncognito.com',
    redirectUri: 'https://dzguyux9hhqs2.cloudfront.net',
    region: 'eu-west-2'
};

class CognitoAuth {
    constructor() {
        this.tokenKey = 'cognito_id_token';
        this.accessTokenKey = 'cognito_access_token';
        this.refreshTokenKey = 'cognito_refresh_token';
        this.userInfoKey = 'cognito_user_info';
    }

    signIn() {
        // Store current page URL in state parameter to redirect back after auth
        const returnUrl = window.location.href;
        const state = btoa(JSON.stringify({ returnUrl }));

        const params = new URLSearchParams({
            client_id: COGNITO_CONFIG.clientId,
            response_type: 'code',
            scope: 'email openid profile',
            redirect_uri: COGNITO_CONFIG.redirectUri,
            state: state
        });

        window.location.href = `${COGNITO_CONFIG.domain}/login?${params.toString()}`;
    }

    signOut() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);

        const params = new URLSearchParams({
            client_id: COGNITO_CONFIG.clientId,
            logout_uri: COGNITO_CONFIG.redirectUri
        });

        window.location.href = `${COGNITO_CONFIG.domain}/logout?${params.toString()}`;
    }

    async handleCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (!code) {
            return false;
        }

        try {
            const tokens = await this.exchangeCodeForTokens(code);

            localStorage.setItem(this.tokenKey, tokens.id_token);
            localStorage.setItem(this.accessTokenKey, tokens.access_token);
            if (tokens.refresh_token) {
                localStorage.setItem(this.refreshTokenKey, tokens.refresh_token);
            }

            const userInfo = await this.getUserInfo(tokens.access_token);
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));

            // Redirect back to original page if state parameter exists
            if (state) {
                try {
                    const { returnUrl } = JSON.parse(atob(state));
                    window.location.href = returnUrl;
                } catch (e) {
                    // If state parsing fails, just clean up the URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } else {
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            return true;
        } catch (error) {
            console.error('Error handling OAuth callback:', error);
            return false;
        }
    }

    async exchangeCodeForTokens(code) {
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: COGNITO_CONFIG.clientId,
            code: code,
            redirect_uri: COGNITO_CONFIG.redirectUri
        });

        const response = await fetch(`${COGNITO_CONFIG.domain}/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!response.ok) {
            throw new Error('Failed to exchange code for tokens');
        }

        return await response.json();
    }

    async getUserInfo(accessToken) {
        const response = await fetch(`${COGNITO_CONFIG.domain}/oauth2/userInfo`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user info');
        }

        return await response.json();
    }

    getIdToken() {
        return localStorage.getItem(this.tokenKey);
    }

    getUserInfo() {
        const userInfoStr = localStorage.getItem(this.userInfoKey);
        return userInfoStr ? JSON.parse(userInfoStr) : null;
    }

    isAuthenticated() {
        return !!this.getIdToken();
    }
}

const cognitoAuth = new CognitoAuth();