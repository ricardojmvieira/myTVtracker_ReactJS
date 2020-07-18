import React from 'react';
import { Container, Button, Col, Row, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import mytvshowService from '../../services/mytvshow';
import SubmitDialogComponent from '../../components/mytvshow/SubmitDialog';
import './Mytvshow.css';

export default class MytvshowsDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {//estado para a serie
            mytvshow: undefined,
            error: undefined,
            toUpdate: false,
        };
    }

    //é chamado apenas uma vez apos o primeiro render do nosso componente
    componentDidMount() {
        mytvshowService
            //nos props vamos ao atributo match(rota) procuramos os seus parametros e obtemos o id
            .getOne(this.props.match.params.id)
            .then(value => this.setState({ mytvshow: value }))//passar o valor 
            .catch(err => this.setState({ error: err }));
    }

    render() {
        const { mytvshow, error, toUpdate } = this.state;
        return (
            <Container className="corDetails">
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
                {mytvshow !== undefined
                    ? <div>
                        <jumbotron>
                            <h5>{mytvshow.tvshowId}</h5>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="info">Temporada</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{mytvshow.season}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="info">Episodio</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{mytvshow.episode}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="info">Estado</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{mytvshow.state}</Col>
                            </Row>
                            <br />
                            <p>
                                <Button
                                    variant="dark"
                                    onClick={() => this.setState({ toUpdate: true })}
                                >
                                    Atualizar
                            </Button>&nbsp;
                            </p>
                        </jumbotron>

                        <SubmitDialogComponent
                            mytvshow={mytvshow}
                            show={toUpdate}
                            handleClose={() => this.setState({ toUpdate: false })}
                            submited={updatedMytvshow =>
                                this.setState({ mytvshow: updatedMytvshow, toUpdate: false })}
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