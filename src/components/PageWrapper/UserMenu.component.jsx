import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { useAuth } from '../../context/auth.context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    cursor: 'pointer'
  },
  menu: {
    marginTop: '20px',
  },
  menuItem: {
    minWidth: '150px'
  }
}));

function UserMenu({ user }) {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuth();

  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  }

  const closeMenu = () => setMenuAnchor(null);

  return (
    <>
      <Avatar
        variant="rounded"
        className={classes.avatar}
        onClick={openMenu}
      >
        {user.username[0].toUpperCase()}
      </Avatar>
      <Menu
        className={classes.menu}
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        {user?.is_admin && (
          <MenuItem onClick={() => history.push('/admin')} className={classes.menuItem}>Admin Interface</MenuItem>
        )}
        <MenuItem onClick={() => history.push('/profile')} className={classes.menuItem}>Profile</MenuItem>
        <MenuItem onClick={logout} className={classes.menuItem}>Logout</MenuItem>
      </Menu>
    </>
  )
}
UserMenu.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserMenu;