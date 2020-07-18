import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import AuthContext from "../../configs/authContext";

export default class NavbarComponent extends React.Component {
    static contextType = AuthContext;

    render() {
        const { user, logout } = this.context;
        return (
            <Navbar bg="light" variant="light" sticky="top">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} exact to="/"><h2>myTVtracker</h2></Nav.Link>
                        </Nav>
                        <Nav>
                            {user ? '' : <Nav.Link as={NavLink} to="/about">About</Nav.Link>}
                            {user ? '' : <Nav.Link as={NavLink} to="/register">Registo</Nav.Link>}
                            {user ?
                                <h4><NavDropdown title={user.username} alignRight>
                                    <NavDropdown.Item as={NavLink} to="/about">About</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                                </NavDropdown></h4> :
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
