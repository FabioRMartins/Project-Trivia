import React from 'react';
/* import logo from './trivia.png'; */
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/configuracao" component={ Config } />
    </Switch>
  );
}
