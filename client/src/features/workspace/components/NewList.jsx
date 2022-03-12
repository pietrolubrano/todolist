import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import styles from '../Workspace.module.css'

import { creteNewList, saveWorkspace } from '../workspaceSlice';

export default function NewList() {
    const [add, setAdd] = useState(false)
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(creteNewList({ name }))
        dispatch(saveWorkspace())
        setName('')
        setAdd(false)
    }

    return (
        <div className={styles.listContainer}>

            <div className={styles.list}>

            {add ?

                <Form onSubmit={handleSubmit} autoComplete="off">

                    <Form.Group className={styles.formgroup} controlId="formNewList">
                        <Form.Control
                            className={styles.formcontrol}
                            type="text"
                            value={name}
                            placeholder="Inserisci il titolo della lista"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="outline-success" className={styles.addTodoButton} >
                        <FontAwesomeIcon icon={faCirclePlus} /* size="2x" */ />
                    </Button>

                </Form>
            :
                <Button
                    className={styles.addListButton}
                    variant='outline-success'
                    onClick={() => setAdd(true)}
                >
                    <FontAwesomeIcon icon={faCirclePlus} />
                </Button>
            }

            </div>    
        </div>
    )
}