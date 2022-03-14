import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGears, faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';

export default function Home(){
    let navigate = useNavigate()

    return(<>
        <Container className={`${styles.header} text-light mb-4`} fluid>
            <Row className={`${styles.headerRow}`}>
                <Col xs={12} sm={8} md={6} lg={6} className="p-4 p-sm-5 ms-md-5">
                    <h1 className="fw-light">Todo List</h1>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe libero aut, fugiat ipsum iure impedit. Maxime, ea! Expedita, veritatis culpa est ducimus fugit cupiditate earum quos harum beatae soluta tempora!</p>
                </Col>
            </Row>  
        </Container>

        <Container className='mb-2'>
            <Row>
                
                <Col md={4} className="mb-3">
                    <div className={styles.card}>
                        <Link to="register">
                            <div className="pt-4 text-center">
                                <FontAwesomeIcon icon={faUser} size="3x" />
                            </div>
                            <div className='text-center w-100 py-4'>
                                Registrati
                            </div>
                        </Link>
                    </div>
                </Col>

                <Col md={4} className="mb-3">
                    <div className={styles.card}>
                        <Link to="workspaces">
                            <div className="pt-4 text-center">
                                <FontAwesomeIcon icon={faGears} size="3x" />
                            </div>
                            <div className='text-center w-100 py-4'>
                                Crea le tue aree di lavoro
                            </div>
                        </Link>
                    </div>
                    
                </Col>

                <Col md={4} className="mb-3">
                    <div className={styles.card}>
                        <div className="pt-4 text-center">
                            <FontAwesomeIcon icon={faCheck} size="3x" />
                        </div>
                        <div className='text-center w-100 py-4'>
                            Fatto!
                        </div>
                    </div>
                </Col>

            </Row>
        </Container>

        <Container className="text-success mb-3 mb-md-5 bg-light" fluid>
            <Row className='py-5 text-center'>
                <Col>
                    <h3>Fai una prova!</h3>
                    <Button
                        variant='outline-success'
                        onClick={() => navigate("/workspacetest")}
                    >
                        Testing Area
                    </Button>
                </Col>
            </Row>
        </Container>
    </>)
}