require('dotenv').config();

module.exports = {
    cognitoRegion: process.env.COGNITO_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    cognitoClientId: process.env.COGNITO_CLIENT_ID,
    cognitoDomain: process.env.COGNITO_DOMAIN,
    apiEndpoint: process.env.API_ENDPOINT
};