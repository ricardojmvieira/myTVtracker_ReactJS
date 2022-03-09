import React from 'react';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import services from "../../services";
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
        services.tvshow
            .getAll()
            .then((value) => this.setState({ tvshows: value }))
            .catch((err) => this.setState({ error: err }));
    }

    //recebe o tvshowId e o nameTVshow e envia um novo pedido para criar um novo objeto na lista dos tvshow visualizados
    addToMyTvshows(tvshowId, nameTVshow) {
        services.mytvshow
            .create(tvshowId, {nameTVshow})
            .catch((err) => this.setState({ error: err }));
    }
    
    render() {
        const { tvshows, error, toCreate } = this.state;
        let currentUser = sessionStorage.getItem('user');
        let role = JSON.parse(currentUser).role;
        return (
            <Container className="cor">
                {error !== undefined && <Alert variant="danger"> {error} </Alert>}
                <br></br>
                <h2>Series</h2>
                <div className="buttons-container">
                    {role === 1 && <Button
                        variant="outline-primary"
                        style={{ alignSelf: 'flex-start' }}
                        onClick={() => this.setState({ toCreate: true })}
                    >
                        <FontAwesomeIcon icon={faPlus} />&nbsp;Adicionar nova Serie
                    </Button>}
                </div>

                {role === 1 && <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={createdTvshow =>
                        this.setState({ tvshows: [...tvshows, createdTvshow], toCreate: false })}
                />}

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nome da Serie</th>
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
                                    {role === 2 && <Button variant="warning" onClick={() => this.addToMyTvshows(tvshow._id, tvshow.nameTVshow)}>
                                        <FontAwesomeIcon icon={faPlusCircle} />&nbsp;Adicionar à minha lista
                                    </Button>}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() =>
                                            this.props.history.push(`/tvshow/details/${tvshow._id}`)}>
                                        <FontAwesomeIcon icon={faInfo} />&nbsp;Detalhes
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