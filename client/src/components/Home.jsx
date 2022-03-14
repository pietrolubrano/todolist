import { Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGears, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Home.module.css';

export default function Home(){
    return(<>
        <Container className={`${styles.header} text-light mb-3 mb-md-5`} fluid>
            <Row className={`${styles.headerRow} py-5`}>
                <Col xs={12} sm={8} md={6} lg={6} className="ms-2 ms-md-5 mx-auto">
                    <h1 className="fw-light">Todo List</h1>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe libero aut, fugiat ipsum iure impedit. Maxime, ea! Expedita, veritatis culpa est ducimus fugit cupiditate earum quos harum beatae soluta tempora!</p>
                </Col>
            </Row>  
        </Container>

        <Container>
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
    </>)
}