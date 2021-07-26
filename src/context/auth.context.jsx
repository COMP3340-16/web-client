import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { useNotification } from './notification.context';
import AuthGateway from '../gateways/auth.gateway';

export const LS_TOKEN_KEY = 'rp';

const AuthContext = React.createContext(null);
export default AuthContext;

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const { toggleNotification } = useNotification();

  const setUserFromToken = React.useCallback(() => {
    const localToken = localStorage.getItem(LS_TOKEN_KEY);
    const userPayload = jwt.decode(localToken, { json: true });

    if (userPayload) {
      setUser(userPayload);
    }
  }, []);

  React.useEffect(() => {
    setUserFromToken();
  }, [setUserFromToken]);

  const login = React.useCallback((username, password, success) => {
    AuthGateway.login(username, password)
      .then((token) => {
        setUser(jwt.decode(token, { json: true }));
        localStorage.setItem(LS_TOKEN_KEY, token);
        toggleNotification(null, 'Logged in');
        if (success) success();
      })
      .catch(toggleNotification);
  }, [toggleNotification]);

  const logout = React.useCallback(() => {
    localStorage.removeItem(LS_TOKEN_KEY);
    setUser(null);
    toggleNotification(null, 'Logged out');
  }, [toggleNotification]);

  const providerValue = React.useMemo(() => ({
    user,
    login,
    logout,
  }), [user, login, logout]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};