import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../src/page/Home'
import Favorite from '../src/page/Favorite'
import Header from '../src/component/Header'
import '../src/css/main.css'

function App() {
  return (
    <>
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route path='/favorite'>
          <Favorite />
        </Route>
      </Switch>  
    </Router>
    </>
    
  );
}

export default App;
