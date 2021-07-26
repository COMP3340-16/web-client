import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import RecipeGateway from '../gateways/recipe.gateway';
import { useNotification } from '../context/notification.context';
import RecipeCardDeck from './RecipeCardDeck.component';
import RecipeModal from '../modals/Recipe.modal';

function UserRecipes({ userId }) {
  const { toggleNotification } = useNotification();

  const [recipes, setRecipes] = React.useState([]);
  const [recipeModalOpen, setRecipeModalOpen] = React.useState(false);

  React.useEffect(() => {
    RecipeGateway.findForUser(userId)
      .then(setRecipes)
      .catch(toggleNotification)
  }, [userId, toggleNotification]);

  const openRecipeModal = () => {
    setRecipeModalOpen(true);
  }
  const closeRecipeModal = () => {
    setRecipeModalOpen(false);
  }

  return (
    <Box component={Paper} variant="outlined" m={2} p={2}>
      <RecipeModal
        isOpen={recipeModalOpen}
        onClose={closeRecipeModal}
      />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h5">
            Your Recipes
          </Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          {recipes.length > 0 ? (
            <RecipeCardDeck recipes={recipes} />
          ) : (
            <Typography variant="caption">
              No Recipes.
            </Typography>
          )}
        </Grid>
        <Grid item container justifyContent="flex-end">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={openRecipeModal}
          >
            New Recipe
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
UserRecipes.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserRecipes;
