import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/User/Login/loginActions';
import styles from '../../Authentication/Login/Login.module.css'

function checkErrors(post) {
    let errors = {};

    if (!post.email) {
        errors.email = 'Please provide an email'
    }

    if (!post.password) {
        errors.password = 'Please provide a password'
    }

    return errors;
}


export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenU = useSelector((state) => state.name)
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({
        email: '',
        password: '',
    })

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) return alert('Please fill in the entire form');
        else if (!post.email || !post.password) return alert('Please fill in the entire form :/');
        else {
            dispatch(signIn(post))
            console.log(tokenU, 'estoy logueado')
            navigate('/')
        }
    }

    function handleInputChange(e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        setErrors(checkErrors({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className={styles.signUp}>
            <h2 className={styles.titleSignUp}>Sign in here</h2>
            <form className={styles.formm} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label >Email</label>
                    <input onChange={(e) => handleInputChange(e)} value={post.email} name='email' />
                    {
                        errors.email && (<p>{errors.email}</p>)
                    }
                </div>
                <div>
                    <label >Password</label>
                    <input onChange={(e) => handleInputChange(e)} value={post.password} name='password' />
                    {
                        errors.password && (<p>{errors.password}</p>)
                    }
                </div>

                <Link to="/passwordRecover">Forgot your password?</Link>

                <button type='submit'>Continue</button>
            </form>
            <Link to="/">
                <button className={styles.btnL}>Home</button>
            </Link>
        </div>

    )
}
