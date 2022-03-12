import { useState } from 'react';

import { useDispatch } from 'react-redux';

/* import { api } from '../api'; */

import { createWorkspace } from '../../workspace/workspaceSlice';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import styles from '../Workspaces.module.css';

export default function CreateWorkspace(){
    const [add, setAdd] = useState(false)
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        if(name){
            dispatch(createWorkspace(name))
            setName('')
            setAdd(false)
        }
    }

    return(
        add ? 

            <Form onSubmit={handleSubmit} className="text-success w-75" autoComplete='off'>

                <Form.Group as={Col} className={styles.formgroup} controlId="formCreateWorkspace">
                    <Form.Control
                        className={styles.formcontrol}
                        type="text"
                        value={name}
                        placeholder="Inserisci il nome del workspace"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                        
                <Button type="submit"/*  variant="outline-success"  */className={styles.addWorkspaceButton} >
                    <FontAwesomeIcon icon={faCirclePlus} />
                </Button>

            </Form>

        :
            <Button
                className='h-100 w-100 text-uppercase border-0'
                variant='outline-success'
                onClick={() => setAdd(true)}
            >
                <FontAwesomeIcon icon={faCirclePlus} size="3x" />
            </Button>
                
    
    )
}