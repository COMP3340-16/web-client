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
import AuthGateway from '../gateways/auth.gateway';
import { useNotification } from '../context/notification.context';

function Register({
  isOpen, onClose
}) {
  const { toggleNotification } = useNotification();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClose = () => {
    onClose();
    setUsername('');
    setEmail('');
    setPassword('');
  }

  const handleRegister = () => {
    AuthGateway.register({
      username,
      email,
      password
    }).then(() => {
      toggleNotification(null, "Registration Complete. You can now login.");
    }).catch(toggleNotification);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hey! I'm glad you're choosing to join us. Fill out the form below to make an account.
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
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  )
}
Register.defaultProps = {
  isOpen: false,
}
Register.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default Register;