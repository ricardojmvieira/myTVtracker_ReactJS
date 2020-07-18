import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from "../components/global/Navbar";
import SidebarComponent from '../components/global/Sidebar';
import PrivateRoute from "../components/global/PrivateRoute";
import roles from "../configs/roles";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import TvshowListPage from '../pages/tvshow/ListTvshow';
import TvshowDetailsPage from '../pages/tvshow/DetailsTvshow';
import MyTvShowListPage from '../pages/mytvshow/ListMytvshow';
import MyTvShowDetailsPage from '../pages/mytvshow/DetailsMytvshow';
import GenreTvshowPage from '../pages/genre/ListGenreTvshow';

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Container xs={2}>
          <Row xs={2} >
            <Col xs={2} ><SidebarComponent /></Col>
            <Col xs={10} margin-left="0" margin-right="0">
              <Switch>
                <PrivateRoute roles={[roles.Admin, roles.User]} exact path="/tvshow/list" component={TvshowListPage} />
                <PrivateRoute roles={[roles.Admin, roles.User]} exact path="/tvshow/details/:id" component={TvshowDetailsPage} />
                <PrivateRoute roles={[roles.User]} exact path="/mytvshow/list" component={MyTvShowListPage} />
                <PrivateRoute roles={[roles.User]} exact path="/mytvshow/details/:id" component={MyTvShowDetailsPage} />
                <PrivateRoute roles={[roles.Admin]} exact path="/genre/list" component={GenreTvshowPage} />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
