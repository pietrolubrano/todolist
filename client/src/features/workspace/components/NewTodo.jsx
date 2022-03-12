import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addToDo, saveWorkspace } from '../workspaceSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { Form, Row, Col, Button } from 'react-bootstrap';
import styles from '../Workspace.module.css'

export default function NewTodo({ listIndex }){
    const [title, setTitle]= useState('')

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        setTitle(title.trim())
        if(title){
            dispatch(addToDo({ listIndex, title }))
            dispatch(saveWorkspace())
            setTitle('')
        }
    }
    return(
        <Form onSubmit={handleSubmit} className={styles.form} autoComplete="off" >

            <Form.Group as={Col} className={styles.formgroup} controlId="formAddTodo">
                {/* <Form.Label>Crea nuova lista</Form.Label> */}
                <Form.Control
                    className={styles.formcontrol}
                    type="text"
                    value={title}
                    placeholder="Nuovo todo"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            
            <Button type="submit" variant="outline-success" className={styles.addTodoButton} >
                <FontAwesomeIcon icon={faCirclePlus} /* size="2x" */ />
            </Button>
        </Form>
    )
}