import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './containers/Home/Home'
import Stock from './containers/Stock/Stock'
import Navbar from './components/Navbar/Navbar'
import './App.css';

const App = () => (
    <div>
        <Navbar/>
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/stock/:stockName" component={Stock} />
        </main>
    </div>
);

export default App;