import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";
import { roles } from "../configs/authContext";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import Home from '../pages/home/Home';
import TvshowListPage from '../pages/tvshow/ListTvshow';
import TvshowDetailsPage from '../pages/tvshow/DetailsTvshow';

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute roles={[roles.Boss, roles.Servent]} exact path="/tvshow/list" component={TvshowListPage} />
          <PrivateRoute roles={[roles.Boss]} exact path="/tvshow/details/:id" component={TvshowDetailsPage} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}
