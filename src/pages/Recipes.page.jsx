import React from 'react';
import { useParams, useHistory } from 'react-router';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import PageWrapper from '../components/PageWrapper/PageWrapper.component';
import RecipeGateway from '../gateways/recipe.gateway';
import { useNotification } from '../context/notification.context';
import RecipeCardDeck from '../components/RecipeCardDeck.component';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '20px'
  },
}));

function ucfl(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function isValidType(type) {
  return ['breakfast', 'lunch', 'dinner'].includes(type);
}

const PAGE_LIMIT = 10;

function Recipes() {
  const classes = useStyles();
  const history = useHistory();
  const { toggleNotification } = useNotification();
  const { type } = useParams();

  const [curPage, setCurPage] = React.useState(0);
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    if (isValidType(type)) {
      RecipeGateway.get(type, PAGE_LIMIT, curPage)
        .then(setRecipes)
        .catch(toggleNotification);
    }
  }, [type, curPage, toggleNotification]);

  React.useEffect(() => {
    if (!isValidType(type)) {
      history.push('/');
    }
  }, [type, history]);

  return (
    <PageWrapper>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="h4" align="center">
              {ucfl(type)} Recipes
            </Typography>
          </Grid>
          <Grid item>
            <RecipeCardDeck recipes={recipes} setRecipes={setRecipes} />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Box component={Paper} p={1} variant="outlined">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Button
                    disabled={curPage === 0}
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => setCurPage(curPage - 1)}
                  >
                    Prev
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="center">
                    {curPage}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    disabled={recipes.length < PAGE_LIMIT}
                    endIcon={<NavigateNextIcon />}
                    onClick={() => setCurPage(curPage + 1)}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Recipes;