import { Alert } from 'react-bootstrap';

export default function AlertError({ error, index }){

    return(
        <Alert
            key={index}
            className='alert-error'
            variant='danger'
        >
            {error.msg}
        </Alert>
    )
}