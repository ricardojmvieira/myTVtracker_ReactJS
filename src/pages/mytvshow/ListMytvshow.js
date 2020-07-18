import React from 'react';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import services from "../../services";
import './Mytvshow.css';

export default class MyTvShowsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {//estado para a serie
            mytvshows: [],//lista dos meus tvshows
            error: undefined,
        };
    }

    //é chamado apenas uma vez apos o primeiro render do nosso componente
    componentDidMount() {
        this.getList();
    }

    //pedido ao servidor para a lista
    getList() {
        services.mytvshow
            .getAll()
            .then((value) => this.setState({ mytvshows: value }))
            .catch((err) => this.setState({ error: err }));
    }

    removeFromMyTvshows(tvshowId) {
        services.mytvshow
            .remove(tvshowId)
            .then(() => this.setState((state) => ({ mytvshows: state.mytvshows.filter((b) => b._id !== tvshowId) })))
            .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { mytvshows, error } = this.state;
        return (
            <Container className="cor">
                {error !== undefined && <Alert variant="danger"> {error} </Alert>}
                <br></br>
                <h2>As Minhas Series</h2>
                <br></br>

                <Table responsive>
                    <thead>
                        <div>
                            <tr>
                                <React.Fragment>
                                    <th width="20%">ID da serie</th>
                                    <th width="10%">Temporada</th>
                                    <th width="10%">Episodio</th>
                                    <th width="15%">Estado</th>
                                    <th width="30%" />
                                </React.Fragment>
                            </tr>
                        </div>
                    </thead>
                    <tbody>
                        {mytvshows.map((mytvshow, index) => (
                            <div width="100" key={`mytvshow${index}`}>
                                {mytvshow.tvshows.map((tvshows, i) => (
                                    <tr key={i}>
                                        <td width="20%">{tvshows.tvshowId}</td>
                                        <td width="10%">{tvshows.season}</td>
                                        <td width="10%">{tvshows.episode}</td>
                                        <td width="15%">{tvshows.state}</td>
                                        <React.Fragment>
                                            <td width="30%">
                                                {<Button variant="outline-danger" onClick={() => this.removeFromMyTvshows(tvshows.tvshowId)}>
                                                    <FontAwesomeIcon icon={faMinusCircle} />&nbsp;Remove da lista
                                                </Button>}

                                                {<Button
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        this.props.history.push(`/mytvshow/details/${tvshows.tvshowId}`)}>
                                                    <FontAwesomeIcon icon={faInfo} />&nbsp;
                                                </Button>}
                                            </td>
                                        </React.Fragment>
                                    </tr>
                                ))}
                            </div>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}