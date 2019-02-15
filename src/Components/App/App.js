import React, { Component } from 'react';
import Login from '../../Container/Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../../Container/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
