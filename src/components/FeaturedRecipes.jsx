import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import RecipeGateway from '../gateways/recipe.gateway';
import { useNotification } from '../context/notification.context';
import RecipeCardDeck from './RecipeCardDeck.component';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    width: '100%'
  },
  title: {
    marginTop: '10px'
  },
  header: {
    marginBottom: theme.spacing(1)
  },
  viewMoreBtn: {
    margin: theme.spacing(1)
  }
}));

const variants = {
  breakfast: {
    title: "It's breakfast time ☕️",
  },
  lunch: {
    title: "How about some lunch? 🍕"
  },
  dinner: {
    title: "Winner, winner, chicken dinner 🍗"
  }
}

function getVariantByTime() {
  const hour = (new Date()).getHours();
  if (hour >= 4 && hour < 12) {
    return "breakfast";
  } else if (hour >= 12 && hour < 17) {
    return "lunch";
  } else {
    return "dinner";
  }
}

/**
 * Generated recipes based on time of day
 */
function FeaturedRecipes() {
  const classes = useStyles();
  const history = useHistory();
  const { toggleNotification } = useNotification();

  const [variant, setVariant] = React.useState(getVariantByTime());
  const [recipes, setRecipes] = React.useState([]);

  React.useState(() => {
    RecipeGateway.get(variant, 6)
      .then(setRecipes)
      .catch(toggleNotification);
  }, [variant]);

  const goToVariantPage = () => {
    history.push(`/recipes/${variant}`);
  }

  return (
    <Box
      component={Paper}
      variant="outlined"
      className={classes.root}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item className={classes.header}>
          <Typography variant="h3">
            {variants[variant].title}
          </Typography>
          <Typography variant="body1" align="center">
            Our data shows that it's
            {' '}
            {variant}
            {' '}
            time.
            <br />
            Here are some recipes you might enjoy.
          </Typography>
        </Grid>
        <Grid item>
          <RecipeCardDeck recipes={recipes} />
        </Grid>
        <Grid item container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            className={classes.viewMoreBtn}
            onClick={goToVariantPage}
          >
            View more {variant} recipes
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FeaturedRecipes;