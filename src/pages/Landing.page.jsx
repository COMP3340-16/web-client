import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Grid
} from '@material-ui/core';

import PageWrapper from '../components/PageWrapper/PageWrapper.component';
import FeaturedRecipes from '../components/FeaturedRecipes';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    maxHeight: '30vh',
    objectFit: 'cover'
  },
  container: {
    marginTop: '20px'
  },
  headline: {
    textAlign: 'left'
  }
}));

function Landing() {
  const classes = useStyles();

  return (
    <PageWrapper transparent absolute>
      <img src="./bg.jpg" alt="pic" className={classes.image} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4" className={classes.headline}>
              Cook like a <u>pro</u>.
            </Typography>
            <Typography variant="h5" className={classes.headline}>
              Eat like a <u>champ</u>.
            </Typography>
          </Grid>
          <Grid item>
            <FeaturedRecipes />
          </Grid>
        </Grid>
      </Container>

    </PageWrapper>
  )
}

export default Landing;