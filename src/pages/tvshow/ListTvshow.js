import React from 'react';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
import tvshowService from "../../services/tvshow";
import SubmitDialogComponent from '../../components/tvshow/SubmitDialog';
import './Tvshow.css';

export default class TvShowListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {//estado para a serie
            tvshows: [],//lista de tvshows
            error: undefined,
            toCreate: false,
        };
    }

    //é chamado apenas uma vez apos o primeiro render do nosso componente
    componentDidMount() {
        this.getList();
    }

    //pedido ao servidor para a lista
    getList() {
        tvshowService
            .getAll()
            .then(value => this.setState({ tvshows: value }))
            .catch(err => this.setState({ error: err }));
    }

    //limpa a lista
    resetList() {
        tvshowService.reset().then(() => this.getList());
    }

    //{} valores dinamicos
    //key serve para indentificar cada um das linhas para fazer alterações ou eliminações 
    //this.props.history.push força a ir para uma nova rota
    render() {
        const { tvshows, error, toCreate } = this.state;
        return (
            <Container>
                {error !== undefined &&
                    <Alert variant="danger">
                        {error}
                    </Alert>}

                <div className="buttons-container">
                    <Button
                        variant="outline-primary"
                        style={{ alignSelf: 'flex-start' }}
                        onClick={() => this.setState({ toCreate: true })}
                    >
                        <FontAwesomeIcon icon={faPlus} />&nbsp;Adicionar nova Serie
                    </Button>
                    <Button
                        variant="outline-dark"
                        style={{ alignSelf: 'flex-end' }}
                        onClick={() => this.resetList()}
                    >
                        <FontAwesomeIcon icon={faRecycle} />&nbsp;Reset lista
                    </Button>
                </div>

                <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={createdTvshow =>
                        this.setState({ tvshows: [...tvshows, createdTvshow], toCreate: false })}
                />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nome do Serie</th>
                            <th>Ranking</th>
                            <th>Gênero</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {tvshows.map((tvshow, index) => (
                            <tr key={`tvshow${index}`}>
                                <td>{tvshow.nameTVshow}</td>
                                <td>{tvshow.ranking}</td>
                                <td>{tvshow.genre}</td>
                                <td>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() =>
                                            this.props.history.push(`/tvshow/details/${tvshow._id}`)}
                                    >
                                        <FontAwesomeIcon icon={faInfo} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}