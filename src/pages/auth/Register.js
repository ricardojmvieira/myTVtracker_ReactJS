import React from "react";
import services from "../../services";
import { Form, Button, Card } from "react-bootstrap";
import "./Auth.css";

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", role: 2 };
    }
    handleSubmit(evt) {
        evt.preventDefault();
        services.user.register(this.state).then(() => {
            this.props.history.push("/login");
        }).catch((err) => { console.log(err) });
    }

    render() {
        const { username, password, role } = this.state;

        return (
            <header className="auth-header">
                <Card style={{ width: "18rem" }}>
                    <Form onSubmit={(evt) => this.handleSubmit(evt)}>
                        <Card.Body>
                            <Card.Title>O seu Registo</Card.Title>
                            <Form.Group>
                                <Form.Label>Utilizador</Form.Label>
                                <Form.Control value={username} onChange={(evt) => this.setState({ username: evt.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(evt) => this.setState({ password: evt.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Permissão</Form.Label>
                                <Form.Control as="select" value={role} onChange={(evt) => this.setState({ role: parseInt(evt.target.value) })}>
                                    <option value={2}>Utilizador</option>
                                    <option value={1}>Administrador</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="success" type="submit" block>Registo</Button>
                        </Card.Body>
                    </Form>
                </Card>
            </header>
        );
    }

}
