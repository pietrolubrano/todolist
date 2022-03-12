import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

import { Form, Button } from 'react-bootstrap';
import styles from './Auth.module.css';

export default function RegisterForm(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const { register } = useContext(AuthContext)

    const hahdelSubmit = (event) => {
        event.preventDefault()

        if(password === passwordCheck){
            register(name, email, password)
        }
    }

    const passwordCheckValidation = () => {
        if(password === passwordCheck){
            return 'is-valid'
        } else {
            return 'is-invalid'
        }
    }

    return(
        <div className={styles.container}>
            <Form className={styles.form} onSubmit={hahdelSubmit}>

                <Form.Group controlId="formRegisterName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        className='mb-2'
                        type="text"
                        placeholder="John"
                        value={name}
                        onChange={ (e) => setName(e.target.value.trim())}
                    />
                </Form.Group>

                <Form.Group controlId="formRegisterEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className='mb-2 text-lowercase'
                        type="text"
                        placeholder="johndoe@domain.com"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value.trim())}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                </Form.Group>
                            
                <Form.Group controlId="formRegisterPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className={ `mb-3 ${(password || passwordCheck) && passwordCheckValidation()} `}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formRegisterRepeatPassword">
                    <Form.Label>Ripeti Password</Form.Label>
                    <Form.Control
                        className={ `mb-3 ${(password || passwordCheck) && passwordCheckValidation()} `}
                        type="password"
                        placeholder="Password"
                        value={passwordCheck}
                        onChange={ (e) => setPasswordCheck(e.target.value)}
                    />
                </Form.Group>

                <Button variant="outline-success" size="sm" className={styles.button} type="submit">
                    Registrati
                </Button>

            </Form>
        </div>
    )
}