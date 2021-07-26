import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Register from './Register.modal';
import { useAuth } from '../context/auth.context';

const useStyles = makeStyles(() => ({
  registerLink: {
    color: 'blue',
    textDecoration: "underline",
    cursor: 'pointer'
  }
}));

function Login({
  isOpen, onClose
}) {
  const classes = useStyles();
  const { login } = useAuth();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClose = () => {
    onClose();
    setUsername('');
    setPassword('');
  }

  const handleLogin = () => {
    login(username, password, handleClose);
  }

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome back, please enter your credentials to login.
            If you don't have an account with us, you can
            {' '}
            <span
              className={classes.registerLink}
              onClick={openRegisterModal}
            >
              register here
            </span>
            .
          </DialogContentText>
          <TextField
            fullWidth
            size="small"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Register
        isOpen={registerModalOpen}
        onClose={closeRegisterModal}
      />
    </>
  )
}
Login.defaultProps = {
  isOpen: false,
}
Login.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default Login;