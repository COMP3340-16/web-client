import React from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PageWrapper from '../components/PageWrapper/PageWrapper.component';
import { useAuth } from '../context/auth.context';
import AdminThemeControl from '../components/AdminThemeControl';
import AdminUserControl from '../components/AdminUserControl';

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

  return user && user.is_admin && (
    <PageWrapper>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">
              Admin Interface
            </Typography>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <AdminThemeControl />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <AdminUserControl />
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Profile;