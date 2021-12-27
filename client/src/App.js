import React, { Fragment, Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./_helpers/history";
import { alertActions } from "./actions/alertActions";
import { notificationActions } from "./actions//notificationActions";
import { PrivateRoute } from "./components/PrivateRoute";
import "./styles/index.css";

const NotFoundPage = lazy(() => import("./NotFoundPage/NotFoundPage"));
const PasswordResetPage = lazy(() =>
  import("./PasswordResetPage/PasswordResetPage")
);
const HomePage = lazy(() => import("./HomePage/HomePage"));
const LoginPage = lazy(() => import("./LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./RegisterPage/RegisterPage"));
const ProfilePage = lazy(() => import("./ProfilePage/ProfilePage"));
const UserProfile = lazy(() => import("./UserProfile/UserProfile"));
const PostUploadPage = lazy(() => import("./PostUploadPage/PostUploadPage"));
const PostPage = lazy(() => import("./PostPage/PostPage"));
const HashtagPage = lazy(() => import("./HashtagPage/HashtagPage"));
const LocationPage = lazy(() => import("./LocationPage/LocationPage"));
const MessengerPage = lazy(() => import("./MessengerPage/MessengerPage"));
const Navbar = lazy(() => import("./components/Navbar"));

import React, { Fragment, Suspense, lazy } from "react";

export function App() {

    return (
      <div>
        <h3>adadad</h3>
      </div>
    );
  }