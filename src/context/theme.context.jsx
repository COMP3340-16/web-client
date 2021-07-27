import React from 'react';
import PropTypes from 'prop-types';
import { useNotification } from './notification.context';
import ThemeGateway from '../gateways/theme.gateway';
import { ThemeProvider } from '@material-ui/styles';
import light from '../themes/light';
import dark from '../themes/dark';

const ThemeContext = React.createContext(null);
export default ThemeContext;

export const useTheme = () => React.useContext(ThemeContext);

const themeMap = {
  'light': light,
  'dark': dark,
}

export const MyThemeProvider = function AuthProvider({ children }) {
  const { toggleNotification } = useNotification();

  const [themeVariant, setThemeVariant] = React.useState('light');

  const refreshTheme = React.useCallback(() => {
    ThemeGateway.getVariant()
      .then(setThemeVariant)
      .catch(toggleNotification)
  }, [toggleNotification]);

  const _setTheme = React.useCallback((variant) => {
    ThemeGateway.setVariant(variant)
      .then(setThemeVariant)
      .catch(toggleNotification);
  }, [toggleNotification]);

  const providerValue = React.useMemo(() => ({
    themeVariant,
    refreshTheme,
    setLight: () => _setTheme('light'),
    setDark: () => _setTheme('dark')
  }), [refreshTheme, themeVariant, _setTheme]);

  React.useEffect(() => {
    refreshTheme();
  }, [refreshTheme])

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeProvider theme={themeMap[themeVariant]}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider >
  );
};
MyThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};