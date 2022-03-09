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
        let currentUser = sessionStorage.getItem('user');
        let role = JSON.parse(currentUser) != null ? JSON.parse(currentUser).role : 0;

        return (
            <div className="sidenav">
                {user && (
                    <Container>
                        <img src={tv} width="170" className="App-image" alt="logo" />
                        <Nav>
                            <>
                                <Nav.Link as={NavLink} to="/tvshow/list">Series de TV</Nav.Link>
                                {role === 2 && <Nav.Link as={NavLink} to="/mytvshow/list">As Minhas Series de TV</Nav.Link>}
                                {role === 1 && <Nav.Link as={NavLink} to="/genre/list">Gêneros</Nav.Link>}
                            </>
                        </Nav>
                    </Container>
                )}
            </div>
        );
    }
}

