import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function RecipeNotFound() {
  const history = useHistory();

  const goBackHome = () => {
    history.push('/');
  }

  return (
    <Box component={Paper} variant="outlined" p={2}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h2" align="center">
          Oops. <br /> We couldn't find that recipe :(
        </Typography>
        <Button
          onClick={goBackHome}
          variant="contained"
          color="secondary"
        >
          Go Home
        </Button>
      </Grid>
    </Box>
  );
}

export default RecipeNotFound;
