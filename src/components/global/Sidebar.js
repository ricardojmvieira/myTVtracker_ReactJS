import React from 'react';
import './Sidebar.css';
import { NavLink } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import AuthContext from "../../configs/authContext";
import tv from '../../assets/tv.PNG';

export default class Sidebar extends React.Component {
    static contextType = AuthContext;
    render() {
        const { user } = this.context;
        return (
            <div class="sidenav">
                {user && (
                    <Container>
                        <img src={tv} width="170" class="App-image" alt="logo" />
                        <Nav>
                            <>
                                <Nav.Link as={NavLink} to="/tvshow/list">Series de TV</Nav.Link>
                                <Nav.Link as={NavLink} to="/mytvshow/list">As Minhas Series de TV</Nav.Link>
                                <Nav.Link as={NavLink} to="/genre/list">Gêneros</Nav.Link>
                            </>
                        </Nav>
                    </Container>
                )}
            </div>
        );
    }
}

