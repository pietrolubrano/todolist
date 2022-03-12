import { useEffect } from 'react';

import { getWorkspaces, selectWorkspaces } from './workspacesSlice';

import CreateWorkspace from './components/CreateWorkspace';
import { Container, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';


import { Link } from "react-router-dom";

import styles from './Workspaces.module.css';

export default function Home(){
    const dispatch = useDispatch()
    const workspaces = useSelector(selectWorkspaces)

    useEffect(() => {
        dispatch(getWorkspaces())
    }, [])

    return(
        <Container fluid>
            <Row className='mt-3'>
                
                    {
                        workspaces.list.map( workspace => 

                            <Col key={workspace._id} className={styles.workspaceCard} md={4} lg={3}>
                                <Col  className='rounded rounded-lg text-center h-100 d-flex justify-content-center align-items-center'>

                                    <Link
                                        className='btn btn-outline-success h-100 w-100 text-uppercase d-flex align-items-center justify-content-center'
                                        to={workspace.name}
                                    >
                                        <h3 className='mb-0'>{workspace.name}</h3>
                                    </Link>

                                </Col>
                           </Col>
                        )
                    }

                <Col className={styles.workspaceCard} md={4} lg={3}>
                     <Col className='rounded rounded-lgtext-center h-100 border border-success d-flex justify-content-center align-items-center'>
                
                        <CreateWorkspace />
                
                    </Col>
                </Col>

            </Row>
        </Container>
    )
}