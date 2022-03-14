import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { AuthContext } from "../../context/auth/AuthContext";
import {
    getWorkspaces,
    setWorkspaces,
    selectWorkspaces
} from '../workspaces/workspacesSlice';

import { selectWorkspace } from './workspaceSlice';

import Board from "./components/Board";

import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import styles from './Workspace.module.css';

export default function Workspace({ test }){
    let { workspaceName } = useParams()
    const { currentUser } = useContext(AuthContext)
    const [selectedWorkspace, setSelectedWorkspace] = useState(workspaceName)

    const workspace = useSelector(selectWorkspace)
    const workspaces = useSelector(selectWorkspaces)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!test){
            setSelectedWorkspace(workspaceName)
        } else {
            setSelectedWorkspace('Test Workspace')
        }
    },[workspaceName])

    useEffect(() => {
        if(!test){
            dispatch(getWorkspaces())
        } else {
            dispatch(setWorkspaces([
                {
                    _id: "test",
                    admin: "test",
                    name: "Test Workspace",
                    createdAt: "2022-03-06T17:09:47.853Z",
                    updatedAt: "2022-03-14T14:42:57.329Z",
                    __v: 0
                }
            ]))
        }
    }, [dispatch, currentUser])

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
                            { selectedWorkspace }
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={styles.dropdownMenu}>
                            {
                                workspaces.list.map( workspacesList => 
                                    <Dropdown.Item
                                        key={workspacesList._id}
                                        className={`${styles.dropdownItem} ${workspacesList.name === workspace.name && styles.dropdownItemActive}`}
                                        onClick={() => setSelectedWorkspace(workspacesList.name)}
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
        
        <Board selectedWorkspace={selectedWorkspace} test={test} />

    </>)
}