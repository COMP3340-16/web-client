import axios from 'axios';
import config from '../config';

const AuthGateway = {}

/**
 * Make a login request 
 */
AuthGateway.login = function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.SERVER_URI}/auth/login`, { username, password })
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

/**
 * Register 
 */
AuthGateway.register = function register(registrationBody) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.SERVER_URI}/auth/register`, registrationBody)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

export default AuthGateway;