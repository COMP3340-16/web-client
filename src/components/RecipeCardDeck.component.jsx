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

function RecipeCardDeck({ recipes }) {
  const classes = useStyles();

  return (
    <Box component={Paper} variant="outlined" p={2}>
      <Grid container direction="row" justifyContent="center">
        {recipes.map((recipe) => (
          <Grid item key={recipe._id} className={classes.card}>
            <RecipeCard recipe={recipe} />
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
}

export default RecipeCardDeck;
