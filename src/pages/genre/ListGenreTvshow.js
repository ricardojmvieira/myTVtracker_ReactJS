import React from 'react';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import services from "../../services";
import SubmitDialogComponent from '../../components/genre/SubmitDialog';
import './Genre.css';

export default class TvShowListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: [],//lista de generos
            error: undefined,
            toCreate: false,
        };
    }

    //é chamado apenas uma vez apos o primeiro render do nosso componente
    componentDidMount() {
        this.getList();
    }

    handleRemove(genreId) {//mandar o id e o metodo removed
        services.genre
            .remove(genreId)
            .then(() => this.setState((state) => ({ genres: state.genres.filter((b) => b._id !== genreId) })))
            .catch((err) => this.setState({ error: err }));
    }

    //pedido ao servidor para a lista
    getList() {
        services.genre
            .getAll()
            .then((value) => this.setState({ genres: value }))
            .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { genres, error, toCreate } = this.state;
        return (
            <Container className="cor">
                {error !== undefined && <Alert variant="danger"> {error} </Alert>}
                <br></br>
                <h2>Gêneros</h2>
                <br></br>
                {<div className="buttons-container">
                    <Button
                        variant="outline-primary"
                        style={{ alignSelf: 'flex-start' }}
                        onClick={() => this.setState({ toCreate: true })}
                    >
                        <FontAwesomeIcon icon={faPlus} />&nbsp;Adicionar Gênero
                    </Button>
                </div>}

                <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={createdGenre =>
                        this.setState({ genres: [...genres, createdGenre], toCreate: false })}
                />

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Gênero</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map((genre, index) => (
                            <tr key={`genre${index}`}>
                                <td>{genre.nameGenre}</td>
                                <td>
                                    {<Button
                                        variant="danger"
                                        onClick={() => this.handleRemove(genre._id)}
                                    >
                                        Remove
                                    </Button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}