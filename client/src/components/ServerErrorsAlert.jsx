import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import  AlertError from './AlertError';

export default function ServerErrorsAlert(){
    const { errors } = useContext(AuthContext);

    return(
        <div className='alert-error-container'>
            {errors.map( (error, index) => 
                <AlertError
                    key={index}
                    error={error}
                    index={index}
                />
            )}
        </div>
    )
}