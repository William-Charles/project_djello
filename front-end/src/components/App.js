import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";

import Navbar from "../components/Navbar";
import LoginContainer from "../containers/LoginContainer";
import HomeContainer from "../containers/HomeContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/home" component={HomeContainer} />
              <Route path="/" component={LoginContainer} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
