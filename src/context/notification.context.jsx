import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const NotificationContext = React.createContext(null);
export default NotificationContext;

export const useNotification = () => React.useContext(NotificationContext);

const DEFAULT_EMPTY_NOTIFICATION = {
  open: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const Notification = function Notification({
  open, close, ttl, error, message,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={ttl}
        onClose={close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={error ? 'error' : 'success'}
          onClose={close}
        >
          {error?.message || message || 'Notification'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
Notification.defaultProps = {
  ttl: 3000,
  error: null,
  message: null,
};
Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  ttl: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string,
    config: PropTypes.shape({
      data: PropTypes.string,
    }),
  }),
  message: PropTypes.string,
};

export const NotificationProvider = function NotificationProvider({ children }) {
  const [notification, setNotification] = React.useState(DEFAULT_EMPTY_NOTIFICATION);

  const toggleNotification = React.useCallback((error, message, ttl) => {
    setNotification({
      open: true,
      error,
      message,
      ttl,
    });
  }, []);

  const providerValue = React.useMemo(() => ({
    toggleNotification,
  }), [toggleNotification]);

  return (
    <NotificationContext.Provider value={providerValue}>
      <Notification
        open={notification.open}
        close={() => {
          setNotification({
            ...notification,
            open: false,
          });
        }}
        ttl={notification.ttl}
        error={notification.error}
        message={notification.message}
      />
      {children}
    </NotificationContext.Provider>
  );
};
NotificationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};