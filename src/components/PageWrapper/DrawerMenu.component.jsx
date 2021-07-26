import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '240px',
  },
  list: {
    width: 250,
  },
}));

function DrawerMenu({
  isOpen, onClose
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
    >
      <div
        className={classes.list}
        role="presentation"
      >
        <List>
          <ListItem button onClick={() => history.push('/')}>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button onClick={() => history.push('/recipes/breakfast')}>
            <ListItemText primary={'Breakfast'} />
          </ListItem>
          <ListItem button onClick={() => history.push('/recipes/lunch')}>
            <ListItemText primary={'Lunch'} />
          </ListItem>
          <ListItem button onClick={() => history.push('/recipes/dinner')}>
            <ListItemText primary={'Dinner'} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}
DrawerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default DrawerMenu;