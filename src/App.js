/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;*/

import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './containers/home'
import Stock from './containers/stock'

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/stock">About</Link>
        </header>

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/stock/:stockName" component={Stock} />
        </main>
    </div>
)

export default App;