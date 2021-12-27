import React, { Fragment, Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./_helpers/history";
import { alertActions } from "./actions/alertActions";
import { notificationActions } from "./actions//notificationActions";
import { PrivateRoute } from "./components/PrivateRoute";
import "./styles/index.css";

class App extends React.Component {
  componentDidMount() {

  }

  handleNotificationPopupClose = () => {
   
  };

  render() {

    return (
      <div>
        <h3>adadad</h3>
      </div>
    );
  }
}

export default App;
