import React from 'react';
import { Container, Button, Col, Row, Jumbotron, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import tvshowService from '../../services/tvshow';
import RemoveDialogComponent from '../../components/tvshow/RemoveDialog';
import SubmitDialogComponent from '../../components/tvshow/SubmitDialog';

export default class TvshowDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {//estado para a serie
            tvshow: undefined,
            error: undefined,
            toRemove: false,
            toUpdate: false,
        };
    }

    //é chamado apenas uma vez apos o primeiro render do nosso componente
    componentDidMount() {
        tvshowService
            //nos props vamos ao atributo match(rota) procuramos os seus parametros e obtemos o id
            .getOne(this.props.match.params.id)
            .then(value => this.setState({ tvshow: value }))//passar o valor 
            .catch(err => this.setState({ error: err }));
    }

    render() {
        const { tvshow, error, toRemove, toUpdate } = this.state;

        return (
            <Container>
                <Button
                    variant="outline-primary"
                    style={{ margin: '10px 0' }}
                    onClick={() => this.props.history.goBack()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />&nbsp;Voltar à lista
                </Button>
                {error !== undefined &&
                    <Alert variant="danger">
                        {error}
                    </Alert>}
                {tvshow !== undefined
                    ? <div>
                        <Jumbotron>
                            <h1>{tvshow.nameTVshow}</h1>
                            <h5>{tvshow._id}</h5>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Ranking</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{tvshow.ranking}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Gênero</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{tvshow.genre}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Descrição</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{tvshow.description}</Col>
                            </Row>
                            <br />
                            <p>
                                <Button
                                    variant="dark"
                                    onClick={() => this.setState({ toUpdate: true })}
                                >
                                    Atualizar
                            </Button>&nbsp;
                            <Button
                                    variant="danger"
                                    onClick={() => this.setState({ toRemove: true })}
                                >
                                    Remover
                            </Button>
                            </p>
                        </Jumbotron>

                        <RemoveDialogComponent
                            tvshowId={tvshow._id}
                            show={toRemove}
                            handleClose={() => this.setState({ toRemove: false })}
                            removed={() => this.props.history.goBack()}
                        />
                        <SubmitDialogComponent
                            tvshow={tvshow}
                            show={toUpdate}
                            handleClose={() => this.setState({ toUpdate: false })}
                            submited={updatedTvshow =>
                                this.setState({ tvshow: updatedTvshow, toUpdate: false })}
                        />
                    </div>
                    :
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
            </Container>
        );
    }
}