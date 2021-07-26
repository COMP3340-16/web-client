import React from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PageWrapper from '../components/PageWrapper/PageWrapper.component';
import { useAuth } from '../context/auth.context';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const { user } = useAuth();

  if (!user) history.push('/');
  return (
    <PageWrapper>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          {user ? (
            <>
              <Typography variant="h3">
                {user.username}
              </Typography>
            </>
          ) : (
            <Typography variant="h1">
              Log in first, stupid!
            </Typography>
          )}

        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Profile;