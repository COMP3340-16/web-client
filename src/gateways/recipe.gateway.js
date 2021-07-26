import axios from 'axios';
import config from '../config';

const RecipeGateway = {};

RecipeGateway.get = function getBreakfast(type = "breakfast", limit = 25, page = 0) {
  return new Promise((resolve, reject) => {
    axios.get(`${config.SERVER_URI}/api/recipes?type=${type}&limit=${limit}&page=${page}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}
RecipeGateway.getBreakfast = (limit = 25, page = 0) => RecipeGateway.get('breakfast', limit, page);
RecipeGateway.getLunch = (limit = 25, page = 0) => RecipeGateway.get('lunch', limit, page);
RecipeGateway.getDinner = (limit = 25, page = 0) => RecipeGateway.get('dinner', limit, page);

RecipeGateway.findById = function findById(recipeId) {
  return new Promise((resolve, reject) => {
    axios.get(`${config.SERVER_URI}/api/recipes/${recipeId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

export default RecipeGateway;