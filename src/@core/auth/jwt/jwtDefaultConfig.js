// ** Auth Endpoints
export default {
  loginEndpoint: 'https://dashboard.heroku.com/apps/distroserver/api/user/login',
  registerEndpoint: 'https://dashboard.heroku.com/apps/distroserver/api/user/register',
  newReleaseEndpoint: 'https://dashboard.heroku.com/apps/distroserver/api/user/new-release',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
