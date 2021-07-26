import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import {
  Autocomplete,
} from '@material-ui/lab';
import { useNotification } from '../context/notification.context';
import RecipeGateway from '../gateways/recipe.gateway';
import { useAuth } from '../context/auth.context';

const DEFAULT_RECIPE = {
  title: '',
  type: 'breakfast',
  ingredients: [],
  instructions: '',
  user: null,
}
const RECIPE_TYPES = ['breakfast', 'lunch', 'dinner'];

function Recipe({
  isOpen, onClose, recipeId
}) {
  const { toggleNotification } = useNotification();
  const { user } = useAuth();

  const [recipe, setRecipe] = React.useState(DEFAULT_RECIPE);

  React.useEffect(() => {
    if (recipeId) {
      RecipeGateway.findById(recipeId)
        .then(setRecipe)
        .catch(toggleNotification);
    }
  }, [recipeId, toggleNotification]);

  const handleClose = () => {
    onClose();
  }
  const handleSave = () => {
    if (user) {
      const dto = {
        ...recipe,
        ingredients: recipe.ingredients.split('.').map((i) => i.trim()).filter((i) => i.length > 2),
        user: user.sub,
      }
      RecipeGateway.create(dto)
        .then(() => {
          toggleNotification(null, "Saved.")
        })
        .catch(toggleNotification);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Recipe Details
        </DialogContentText>

        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              fullWidth
              size="small"
              label="Title"
              variant="outlined"
              value={recipe.title}
              onChange={(event) => setRecipe({ ...recipe, title: event.target.value })}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              size="small"
              options={RECIPE_TYPES}
              value={recipe.type}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Type" variant="outlined" />
              )}
              onChange={(_, newValue) => setRecipe({
                ...recipe,
                type: newValue,
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              multiline
              fullWidth
              size="small"
              variant="outlined"
              label="Ingredients"
              helperText="Delimit each ingredient with a period (.) for better display"
              value={recipe.ingredients}
              onChange={(event) => setRecipe({ ...recipe, ingredients: event.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              multiline
              fullWidth
              size="small"
              variant="outlined"
              label="Instructions"
              helperText="Delimit each instruction with a period (.) for better display"
              value={recipe.instructions}
              onChange={(event) => setRecipe({ ...recipe, instructions: event.target.value })}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSave}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  )
}
Recipe.defaultProps = {
  isOpen: false,
  recipeId: null,
}
Recipe.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  recipeId: PropTypes.string,
}

export default Recipe;