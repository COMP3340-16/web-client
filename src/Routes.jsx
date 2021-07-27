import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useAuth, LS_TOKEN_KEY } from './context/auth.context';
import Landing from './pages/Landing.page';
import Recipe from './pages/Recipe.page';
import Recipes from './pages/Recipes.page';
import Profile from './pages/Profile.page';
import Admin from './pages/Admin.page';
import axios from 'axios';
import config from './config';

export default function Routes() {
  const { user } = useAuth();

  // Add a request interceptor
  axios.interceptors.request.use((req) => {
    if (req.url.includes(config.SERVER_URI)) {
      const token = localStorage.getItem(LS_TOKEN_KEY);
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/recipe/:recipeId">
          <Recipe />
        </Route>
        <Route path="/recipes/:type">
          <Recipes />
        </Route>

        {user && (
          <>
            <Route path="/profile">
              <Profile />
            </Route>
            {user.is_admin && (
              <Route path="/admin">
                <Admin />
              </Route>
            )}
          </>
        )}

        <Route path="*">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}