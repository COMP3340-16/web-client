import React from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PageWrapper from '../components/PageWrapper/PageWrapper.component';
import { useAuth } from '../context/auth.context';
import UserRecipes from '../components/UserRecipes.component';

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

function Profile() {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <PageWrapper>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          {user && (
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="h3">
                  {user.username}
                </Typography>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <UserRecipes userId={user.sub} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Profile;