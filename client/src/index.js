
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";



import Routes from './routes';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";








ReactDOM.render(
 <Routes/>,
  document.getElementById("root")
);

{/* <Route path="/auth" render={props => <AuthLayout {...props} />} /> */}