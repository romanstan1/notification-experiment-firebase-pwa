import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Nav from './components/Nav'
import ShopPage from './components/Shop'
import HomePage from './components/Homepage'
import './App.css';

const App = () =>
  <div>
    <Nav/>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/shop" component={ShopPage} />
      <Route component={HomePage}/>
    </Switch>
  </div>

export default App;
