import PropTypes from "prop-types";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../routes/auth";
import Feed from "../routes/Feed";
import Explore from "../routes/Explore";
import Search from "../routes/search";
import Profile from "../routes/Profile";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRoutes = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRoutes;
