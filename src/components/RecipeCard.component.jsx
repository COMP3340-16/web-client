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
import { useAuth } from '../context/auth.context';
import RecipeModal from '../modals/Recipe.modal';

const useStyles = makeStyles(() => ({
  root: {
    width: 275,
  },
  type: {
    fontSize: 14,
  },
  id: {
    borderTop: '5px solid orange'
  }
}));

function RecipeCard({ recipe, update }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();

  const [recipeModalOpen, setRecipeModalOpen] = React.useState(false);
  const openRecipeModal = () => setRecipeModalOpen(true);
  const closeRecipeModal = () => setRecipeModalOpen(false);

  const viewFullRecipe = () => {
    history.push(`/recipe/${recipe._id}`);
  }

  return (
    <Card className={classes.root} raised>
      <RecipeModal
        isOpen={recipeModalOpen}
        onClose={closeRecipeModal}
        recipeId={recipe._id}
        onSave={(saved) => update(saved)}
      />
      <CardContent className={user && user.sub === recipe.user?._id && classes.id}>
        <Typography className={classes.type} color="textSecondary" gutterBottom>
          {recipe.type}
        </Typography>
        <Typography variant="h5" component="h2">
          {recipe.title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          <u>Author:</u> {recipe.user ? recipe.user.username : ' -- '}
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
        {
          user && user.sub === recipe.user?._id && (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={openRecipeModal}
            >
              Edit
            </Button>
          )
        }
      </CardActions>
    </Card>
  );
}
RecipeCard.defaultProps = {
  update: () => { }
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  update: PropTypes.func,
}

export default RecipeCard;