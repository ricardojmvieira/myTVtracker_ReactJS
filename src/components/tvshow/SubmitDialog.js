import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import tvshowService from '../../services/tvshow';

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.tvshow !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? this.props.tvshow
      : {
        nameTVshow: '',
        ranking: 0,
        genre: '',
        description: '',
      };
  }

  handleSubmit(evt) {
    evt.preventDefault();//prevenir que o formulario submeta por defeito o serviço na web
    if (this.toEdit) {
      tvshowService
        .update(this.props.tvshow._id, this.state)
        .then(() => this.props.submited(this.state));
    } else {
      tvshowService
        .create(this.state)
        .then(tvshowId => this.props.submited({ ...this.state, _id: tvshowId }));
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    const { nameTVshow, ranking, genre, description } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? 'Editar Serie de TV' : 'Adicionar Serie de TV'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={evt => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome da Serie</Form.Label>
              <Form.Control
                value={nameTVshow}
                onChange={evt => this.setState({ nameTVshow: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ranking</Form.Label>
              <Form.Control
                type="number"
                value={ranking}
                onChange={evt => this.setState({ ranking: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                value={genre}
                onChange={evt => this.setState({ genre: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                value={description}
                onChange={evt =>
                  this.setState({ description: evt.target.value })}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
