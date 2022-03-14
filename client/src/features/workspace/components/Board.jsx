import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getWorkspace, setWorkspace, selectWorkspace } from "../workspaceSlice";

import List from "./List";
import NewList from "./NewList";

import { Container, Row, Col } from 'react-bootstrap';
import styles from '../Workspace.module.css';

export default function Board({ selectedWorkspace, test }) {

    const dispatch = useDispatch()
    const workspace = useSelector(selectWorkspace)

    let navigate = useNavigate()

    useEffect(() => {
        if(!test){
            navigate(`/workspaces/${selectedWorkspace}`)
            dispatch(getWorkspace(selectedWorkspace))
        } else {
            dispatch(setWorkspace(
                {
                    _id: 'testing',
                    name: 'Test Workspace',
                    lists: []
                }
            ))
        }
    },[dispatch, selectedWorkspace])

    if(workspace.status === 'pending'){
        return (
            <Container fluid className="h-100 w-100 p-0">

                <Row className="h-100 w-100 m-0">
                    <Col className="text-center m-auto display-4 text-success">
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
                        Workspace {`<${selectedWorkspace}>`} Not Found
                    </Col>
                </Row>

            </Container>
        )
    }

    return (
        <Container fluid className={styles.container}>

            { workspace.lists.map( (list, index) => 
                <List key={index} list={list} listIndex={index} test={test} />
            ) }

            <NewList test={test}/>

        </Container>
    )
}
