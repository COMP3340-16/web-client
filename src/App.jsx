import React from 'react';
import { AuthProvider } from './context/auth.context';
import { NotificationProvider } from './context/notification.context';
import Routes from './Routes';
import { MyThemeProvider } from './context/theme.context';


function App() {
  return (
    <div>
      <NotificationProvider>
        <MyThemeProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </MyThemeProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
