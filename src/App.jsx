import React from 'react';
import { AuthProvider } from './context/auth.context';
import { NotificationProvider } from './context/notification.context';
import Routes from './Routes';

function App() {
  return (
    <div>
      <NotificationProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
