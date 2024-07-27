// Gateway IP
const api_server: string = 'http://192.168.0.181:8080/api';

export const environment = {
  production: false,
  user_management_service: `${api_server}`,
  membership_service: `${api_server}/alumni`,
  authentication_service: `${api_server}/auth`,
};
