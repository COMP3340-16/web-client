import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import DrawerMenu from './DrawerMenu.component';
import Login from '../../modals/Login.modal';
import { useAuth } from '../../context/auth.context';
import UserMenu from './UserMenu.component';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      fontWeight: 600
    }
  },
}));

function NavBar({ transparent, absolute }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  }
  const closeDrawer = () => {
    setDrawerOpen(false);
  }

  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(true);
  }
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  }

  const goHome = () => {
    history.push('/');
  }

  return (
    <>
      <AppBar
        position={absolute ? "absolute" : "static"}
        color={transparent ? "transparent" : "primary"}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={goHome}
          >
            Recipes
          </Typography>
          {
            user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={openLoginModal}
                >
                  Login
                </Button>
              </>
            )
          }

        </Toolbar>
      </AppBar>
      <DrawerMenu
        isOpen={drawerOpen}
        onClose={closeDrawer}
      />
      <Login
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  )
}
NavBar.defaultProps = {
  transparent: false,
  absolute: false,
}
NavBar.propTypes = {
  transparent: PropTypes.bool,
  absolute: PropTypes.bool,
}

export default NavBar;
