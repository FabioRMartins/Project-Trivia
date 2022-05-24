import React from 'react';
/* import logo from './trivia.png'; */
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
