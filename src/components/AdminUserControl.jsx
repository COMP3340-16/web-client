import React from 'react';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  TextField,
  MenuItem
} from '@material-ui/core';
import UserGateway from '../gateways/user.gateway';
import { useNotification } from '../context/notification.context';
import { useAuth } from '../context/auth.context';

function AdminUserControl() {
  const { toggleNotification } = useNotification();
  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    UserGateway.findAll()
      .then(setUsers)
      .catch(toggleNotification);
  }, [toggleNotification])

  const insertUpdatedUser = (user) => {
    const curUsers = [...users];
    const idx = curUsers.map((u) => u._id).indexOf(user._id);
    if (idx > -1) {
      curUsers[idx] = user;
      setUsers(curUsers);
    }
  }

  const updateUser = (user) => {
    console.log(user);
    UserGateway.update(user)
      .then(insertUpdatedUser)
      .catch(toggleNotification)
  }

  return (
    <Box component={Paper} variant="outlined" style={{ width: '100%' }} p={3}>
      <Grid container direction="column">
        <Typography variant="h6">
          Users
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableHead>
            <TableBody>
              {users.filter((u) => u._id !== user.sub).map((u) => (
                <TableRow key={u._id}>
                  <TableCell align="center">{u.username}</TableCell>
                  <TableCell align="center">
                    <TextField
                      size="small"
                      variant="outlined"
                      select
                      value={u.is_admin}
                      onChange={(event) => {
                        const admin = event.target.value;
                        updateUser({ ...u, is_admin: admin })
                      }}
                    >
                      {[true, false].map((option) => (
                        <MenuItem key={option.toString()} value={option}>
                          {option.toString()}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell align="center">{u.email}</TableCell>
                  <TableCell align="center">action</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
}

export default AdminUserControl;