import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import {
    getWorkspaces,
    setWorkspaces,
    selectWorkspaces
} from '../workspaces/workspacesSlice';

import {
    getWorkspace,
    setWorkspace,
    selectWorkspace } 
from './workspaceSlice';

import List from "./components/List";
import NewList from "./components/NewList";

import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import styles from './Workspace.module.css';

export default function Workspace({ test }){
    const workspace = useSelector(selectWorkspace)
    const workspaces = useSelector(selectWorkspaces)

    const dispatch = useDispatch()

    let navigate = useNavigate()
    let { workspaceName } = useParams()

    useEffect(() => {
        if(!test){
            dispatch(getWorkspaces())
            dispatch(getWorkspace(workspaceName))
        } else {
            dispatch(setWorkspaces([
                {
                    _id:"test",
                    admin:"test",
                    name:"Test Workspace",
                    createdAt:"2022-03-06T17:09:47.853Z",
                    updatedAt:"2022-03-14T14:42:57.329Z",
                    __v:0
                }
            ]))
            dispatch(setWorkspace(
                { 
                    _id: 'testing',
                    name: 'Test Workspace',
                    lists: []
                }
            ))
        }
    }, [dispatch, workspaceName])

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
        <Container fluid>

            <Row className={styles.header}>

                <Col>

                    <Dropdown>
                        <Dropdown.Toggle
                            className={styles.dropdownButton}
                            variant="success"
                            id="dropdown-workspaces"
                        >
                            {workspace.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={styles.dropdownMenu}>
                            {
                                workspaces.list.map( workspacesList => 
                                    <Dropdown.Item
                                        key={workspacesList._id}
                                        className={`${styles.dropdownItem} ${workspacesList.name === workspace.name && styles.dropdownItemActive}`}
                                        onClick={() => navigate(`/workspaces/${workspacesList.name}`)}
                                    >
                                        {workspacesList.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                
            </Row>

        </Container>

        <Container fluid className={styles.container}>
                
            { workspace.lists.map( (list, index) => 
                <List key={index} list={list} listIndex={index} test={test} />
            ) }

            <NewList test={test}/>

        </Container>
    </>)
}