import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import tvshowService from '../../services/tvshow';

export default class RemoveDialogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sure: false };
  }

  handleRemove() {//mandar o id e o metodo removed
    tvshowService.remove(this.props.tvshowId).then(() => {
      this.props.removed();
    });
  }

  render() {
    const { show, handleClose } = this.props;
    const { sure } = this.state;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remover Serie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem a certeza que pretende eliminar esta serie?
          <FontAwesomeIcon
            style={{ marginLeft: 10 }}
            onClick={() => this.setState({ sure: !sure })}
            icon={sure ? faCheckSquare : faSquare}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={!sure}
            onClick={() => this.handleRemove()}
          >
            Apagar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
