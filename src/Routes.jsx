import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Landing from './pages/Landing.page';
import Recipe from './pages/Recipe.page';
import Recipes from './pages/Recipes.page';
import Profile from './pages/Profile.page';

export default function Routes() {
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
        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="*">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}