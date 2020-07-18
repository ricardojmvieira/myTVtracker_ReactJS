import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import genreService from '../../services/genre';

export default class SubmitDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameGenre: '',
        };
    }

    handleSubmit(evt) {
        evt.preventDefault();//prevenir que o formulario submeta por defeito o serviço na web
        genreService
            .create(this.state)
            .then(genreId => this.props.submited({ ...this.state, _id: genreId }));
    }

    handleCancel() {
        this.setState(this.getFormState());
        this.props.handleClose();
    }

    render() {
        const { show, handleClose } = this.props;
        const { nameGenre } = this.state;

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Adicionar Gêneros</Modal.Title>
                </Modal.Header>
                <Form onSubmit={evt => this.handleSubmit(evt)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nome do Gênero</Form.Label>
                            <Form.Control
                                value={nameGenre}
                                onChange={evt => this.setState({ nameGenre: evt.target.value })}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Cancelar
            </Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}
