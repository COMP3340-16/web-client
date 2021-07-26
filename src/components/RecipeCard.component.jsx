import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    width: 275,
  },
  type: {
    fontSize: 14,
  }
}));

function RecipeCard({ recipe }) {
  const classes = useStyles();
  const history = useHistory();

  const viewFullRecipe = () => {
    history.push(`/recipe/${recipe._id}`);
  }

  return (
    <Card className={classes.root} raised>
      <CardContent>
        <Typography className={classes.type} color="textSecondary" gutterBottom>
          {recipe.type}
        </Typography>
        <Typography variant="h5" component="h2">
          {recipe.title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          <u>Author:</u> {recipe.user?.username}
        </Typography>
        <Typography variant="body2" component="p">
          {recipe.instructions.slice(0, 75)}
          {' '}
          ...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={viewFullRecipe}
        >
          View Full Recipe
        </Button>
      </CardActions>
    </Card>
  );
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default RecipeCard;