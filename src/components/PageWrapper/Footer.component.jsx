import React from 'react';
import {
  Box,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20
  },
  text: {
    paddingRight: '10px'
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      component={Paper}
      square
      variant="outlined"
    >
      <Typography
        variant="caption"
        className={classes.text}
      >
        Mostapha Rammo © 2021
      </Typography>
    </Box>
  );
}

export default Footer;