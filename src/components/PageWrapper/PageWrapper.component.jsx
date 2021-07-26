import React from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.component';
import Footer from './Footer.component';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  wave: {
    zIndex: 20
  },
  imageContainer: {

  },
  image: {
    zIndex: 10,
    width: '100%',
    objectFit: 'cover',
    maxHeight: '50vh',
    position: 'absolute'
  }
}));


function PageWrapper({ children, transparent, absolute }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar
        transparent={transparent}
        absolute={absolute}
      />
      <main> {children} </main>
      <Footer />
    </div>
  )
}
PageWrapper.defaultProps = {
  transparent: false,
  absolute: false,
}
PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  transparent: PropTypes.bool,
  absolute: PropTypes.bool,
}

export default PageWrapper;