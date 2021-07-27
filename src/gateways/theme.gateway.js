import axios from 'axios';
import config from '../config';

const ThemeGateway = {};

ThemeGateway.getVariant = function getVariant() {
  return new Promise((resolve, reject) => {
    axios.get(`${config.SERVER_URI}/api/theme`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

ThemeGateway.setVariant = function setVariant(variant) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.SERVER_URI}/api/theme?variant=${variant}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

export default ThemeGateway;