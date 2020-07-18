import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import mytvshowService from '../../services/mytvshow';
import tvstate from "../../configs/tvState";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.mytvshow !== undefined;
    this.state = this.getFormState();

  }

  getFormState() {
    return this.toEdit
      && this.props.mytvshow
  }

  handleSubmit(evt) {
    evt.preventDefault();//prevenir que o formulario submeta por defeito o serviço na web
    if (this.toEdit) {
      mytvshowService
        .update(this.props.mytvshow.tvshowId, this.state)
        .then(() => this.props.submited(this.state));
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    const { season, episode, state } = this.state;
    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>Editar Serie de TV</Modal.Title>
        </Modal.Header>
        <Form onSubmit={evt => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Temporada</Form.Label>
              <Form.Control
                type="number"
                value={season}
                onChange={evt => this.setState({ season: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Episodio</Form.Label>
              <Form.Control
                type="number"
                value={episode}
                onChange={evt => this.setState({ episode: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                value={state}
                onChange={evt => this.setState({
                  state: evt.target.value
                })}
              >
                <option value={tvstate.Starting}>Por começar</option>
                <option value={tvstate.Running}>A ver</option>
                <option value={tvstate.Complete}>Finalizada</option>
              </Form.Control>
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
