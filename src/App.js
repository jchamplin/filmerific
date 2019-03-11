import React, { Component } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Film from './components/Film/Film';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

/**
 * The main app component
 */
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route exact path="/" render={Home} />
          <Route path="/search/:filter" component={Search} />
          <Route path="/movie/:id" render={(props) => <Film {...props} type="movie" />}  />
          <Route path="/tv/:id" render={(props) => <Film {...props} type="tv" />}  />
        </div>
      </Router>
    );
  }
}

export default App;
