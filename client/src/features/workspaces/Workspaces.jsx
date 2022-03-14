import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { getWorkspaces, setWorkspaces, selectWorkspaces } from './workspacesSlice';
import CreateWorkspace from './components/CreateWorkspace';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Workspaces.module.css';

export default function Home(){
    const dispatch = useDispatch()
    const workspaces = useSelector(selectWorkspaces)

    useEffect(() => {
        dispatch(getWorkspaces())
    }, [dispatch])

    return(<>

        <Container fluid className="p-0">

            <div className={styles.header}>
                <h4 className="m-0">Workspaces</h4>
            </div>

        </Container>

        <Container fluid>
            <Row className='mt-3'>
                
                {
                    workspaces.list.map( workspace => 
                        <Col key={workspace._id} className={styles.workspaceCard} md={4} lg={3}>
                            <Link
                                className={`btn ${styles.workspaceButton}`}
                                to={workspace.name}
                            >
                                <h3 className='mb-0'>{workspace.name}</h3>
                            </Link>
                        </Col>
                    )
                }

                <Col className={styles.workspaceCard} md={4} lg={3}>
                     <Col className='rounded rounded-lg text-center h-100 border border-success d-flex justify-content-center align-items-center'>
                
                        <CreateWorkspace />
                
                    </Col>
                </Col>

            </Row>
        </Container>
    </>)
}