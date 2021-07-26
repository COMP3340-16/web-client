import React from 'react';
import {
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useParams
} from 'react-router-dom';
import RecipeGateway from '../gateways/recipe.gateway';
import { useNotification } from '../context/notification.context';
import RecipeDisplay from '../components/RecipeDisplay.component';
import RecipeNotFound from '../components/RecipeNotFound.component';

import PageWrapper from '../components/PageWrapper/PageWrapper.component';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '20px'
  },
}));

function Recipe() {
  const classes = useStyles();
  const { toggleNotification } = useNotification();

  const { recipeId } = useParams();

  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    RecipeGateway.findById(recipeId)
      .then(setRecipe)
      .catch(toggleNotification);
  }, [recipeId, toggleNotification]);

  return (
    <PageWrapper>
      <Container maxWidth="lg" className={classes.container}>
        {recipe ? (
          <RecipeDisplay recipe={recipe} />
        ) : (
          <RecipeNotFound />
        )}
      </Container>
    </PageWrapper>
  )
}

export default Recipe;