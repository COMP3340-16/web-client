import axios from 'axios';
import config from '../config';

const UserGateway = {};

UserGateway.findAll = function findAll() {
  return new Promise((resolve, reject) => {
    axios.get(`${config.SERVER_URI}/api/users`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

UserGateway.update = function update(userUpdate) {
  return new Promise((resolve, reject) => {
    axios.put(`${config.SERVER_URI}/api/users`, userUpdate)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

export default UserGateway;