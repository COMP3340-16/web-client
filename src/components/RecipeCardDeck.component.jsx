import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Grid,
} from '@material-ui/core';
import RecipeCard from './RecipeCard.component';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    margin: 10
  }
}));

function RecipeCardDeck({ recipes, setRecipes }) {
  const classes = useStyles();

  const updateRecipeCard = (update) => {
    const curRecipes = [...recipes];
    const idx = curRecipes.map((r) => r._id).indexOf(update._id);
    if (idx > -1) {
      curRecipes[idx] = update;
      setRecipes(curRecipes);
    }
  }

  return (
    <Box component={Paper} variant="outlined" p={2}>
      <Grid container direction="row" justifyContent="center">
        {recipes.map((recipe) => (
          <Grid item key={recipe._id} className={classes.card}>
            <RecipeCard
              recipe={recipe}
              update={updateRecipeCard}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
RecipeCardDeck.propTypes = {
  recipes: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setRecipes: PropTypes.func,
}

export default RecipeCardDeck;
