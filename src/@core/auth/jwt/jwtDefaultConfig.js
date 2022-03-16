// ** Auth Endpoints
export default {
  loginEndpoint: 'http://localhost:4000/api/user/login',
  registerEndpoint: 'http://localhost:4000/api/user/register',
  newReleaseEndpoint: 'http://localhost:4000/api/user/new-release',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}