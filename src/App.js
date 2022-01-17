import Navbar from "./components/Navbar";
import React, { Component } from "react";
import "./App.css";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;

  state = { progress: 10 };

  setprogress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />

          <Switch>
            <Route exact path="/">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="root"
                pagesize="12"
                country="In"
                category="general"
              />{" "}
            </Route>
            <Route exact path="/home">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="general"
                pagesize="12"
                country="In"
                category="general"
              />{" "}
            </Route>
            <Route exact path="/business">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="business"
                pagesize="12"
                country="In"
                category="business"
              />{" "}
            </Route>
            <Route exact path="/entertainment">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="entertainment"
                pagesize="12"
                country="In"
                category="entertainment"
              />{" "}
            </Route>
            <Route exact path="/health">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="health"
                pagesize="12"
                country="In"
                category="health"
              />{" "}
            </Route>
            <Route exact path="/science">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="science"
                pagesize="12"
                country="In"
                category="science"
              />{" "}
            </Route>
            <Route exact path="/sports">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="sports"
                pagesize="12"
                country="In"
                category="sports"
              />{" "}
            </Route>
            <Route exact path="/technology">
              {" "}
              <News
                apikey={this.apikey}
                setprogress={this.setprogress}
                key="technology"
                pagesize="12"
                country="In"
                category="technology"
              />{" "}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
