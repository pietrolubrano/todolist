import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import {
    getWorkspace,
    selectWorkspace } 
from './workspaceSlice';

import List from "./components/List";
import NewList from "./components/NewList";

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Workspace.module.css'

export default function Workspace(){
    const workspace = useSelector(selectWorkspace)

    const dispatch = useDispatch()

    let { workspaceName } = useParams()

    useEffect(() => {
        dispatch(getWorkspace(workspaceName))
    }, [])

    if(workspace.status === 'pending'){
        return (
            <Container fluid className="h-100 w-100 p-0">

                <Row className="h-100 w-100 m-0">
                    <Col className="text-center m-auto display-4 text-white">
                        <div className="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </Col>
                </Row>

            </Container>
        )
    }

    if(workspace.status === 'rejected'){
        return (
            <Container fluid className="h-100 w-100 p-0">

                <Row className="h-100 w-100 bg-danger m-0">
                    <Col className="text-center m-auto display-4 text-white">
                        Workspace {`<${workspaceName}>`} Not Found
                    </Col>
                </Row>

            </Container>
        )
    }

    return(<>
        <Container fluid className="p-0">

            <div className={styles.header}>
                <h4 className="m-0">{workspace.name}</h4>
            </div>

        </Container>

        <Container fluid className={styles.container}>
                
            { workspace.lists.map( (list, index) => <List key={index} list={list} listIndex={index} />) }

            <NewList />

        </Container>
    </>)
}