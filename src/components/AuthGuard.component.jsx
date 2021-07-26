import React from 'react';
import axios from 'axios';
import config from '../config';
import { useAuth, LS_TOKEN_KEY } from '../context/auth.context';

const Routes = React.lazy(() => import('../Routes'));
const Login = React.lazy(() => import('../pages/Login.page'));

function AuthGuard() {
  const { user, logout } = useAuth();

  // Add a request interceptor
  axios.interceptors.request.use((req) => {
    if (req.url.includes(config.SERVER_URI)) {
      const token = localStorage.getItem(LS_TOKEN_KEY);
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  // Add a response interceptor
  axios.interceptors.response.use(null, (error) => {
    if (error.response) {
      if (error.response.data.logout) {
        logout();
      }
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  });

  return (
    <React.Suspense fallback={<div />}>
      {user ? <Routes /> : <Login />}
    </React.Suspense>
  );
}

export default AuthGuard;