import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import { Form, Button } from 'react-bootstrap';
import styles from './Auth.module.css';

export default function SignInForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signInWithEmailAndPassword } = useContext(AuthContext)

    const hahdelSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(email, password)
    }

    return(
        <div className={styles.container}>

            <Form className={styles.form} onSubmit={hahdelSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className='custom-form-input text-lowercase'
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className='custom-form-input'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="outline-success" size="sm" className={styles.button} type="submit">
                    Accedi
                </Button>

                <div className='text-center'>
                    <Form.Text muted className='text-center'>
                        Non hai ancora un account? <Link className='text-success' to="/register">Registrati</Link>
                    </Form.Text>
                </div>

            </Form>

        </div>
    )
}