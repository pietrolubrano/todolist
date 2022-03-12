import { createContext, useEffect, useState } from 'react';
import { api } from '../../api';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [errors, setErrors] = useState([])

    const handleErrors = (errors) => {
        setErrors([])
        setErrors(errors)
    }

    const signIn = () => {
        api.get('auth')
        .then(res => {
            setCurrentUser(res.data.user)
            setPending(false)
        })
        .catch(err => {
            console.error(err.response.data.msg)
            setPending(false)
            handleErrors(err.response.data.errors)
        })
    }

    const logOut = () => {
        localStorage.removeItem('token')
        setCurrentUser(null)
    }

    const signInWithEmailAndPassword = (email, password) => {
        api.post('auth', { email, password })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            setCurrentUser(res.data.user)
            setPending(false)
        })
        .catch(err => {
            console.error(err.response.data)
            handleErrors(err.response.data.errors)
            setPending(false)
        })
    }

    const register = (name, email, password) => {
        api.post('users', { name, email, password })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            setCurrentUser(res.data.user)
            setPending(false)
        })
        .catch(err => {
            console.error(err.response.data.errors)
            setPending(false)
            handleErrors(err.response.data.errors)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            setPending(false)
        } else {
            signIn()
        }
    },[])

    if(pending){
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
        value={{
            currentUser,
            errors,
            signInWithEmailAndPassword,
            register,
            logOut,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
