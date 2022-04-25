import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/User/Login/loginActions';
import { permission } from '../../../redux/';
import GoogleLogin from 'react-google-login';
import { loginGoogle } from '../../../redux/User/Login/loginActions';
import { CLIENT_ID_GOOGLE } from '../../../env';
import imgGoogle from '../../../assets/google.png'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { mainPage } from '../../../env'
import styles from './Login.module.css'

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

    const [seePassword, setSeePassword] = useState(false);

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
            const token = window.localStorage.getItem('token')
            console.log(token)
            dispatch(permission(token))
            window.location.href = mainPage
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

    const onClick = () => {
        setSeePassword(!seePassword);
    };

    const respuestaGoogle = (respuesta) => {
        console.log(respuesta, 'soy respuesta de google');
        // console.log(respuesta.profileObj),'soy profileobj';
        let userData = {
            firstName: respuesta.profileObj,
            image: respuesta.profileObj.imageUrl,
            email: respuesta.profileObj.email,
            tokenId: respuesta.tokenId,
        };
        console.log(userData, 'soy user data de google');
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
        return dispatch(loginGoogle(userData));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.loginTitle}>Sign in here</h2>
            <div className={styles.login}>
                <div className={styles.left}>
                    <GoogleLogin
                        clientId={CLIENT_ID_GOOGLE}
                        //   render={(renderProps) => (
                        //     <button
                        //       type="button"
                        //       onClick={renderProps.onClick}
                        //       disabled={renderProps.disabled}
                        //       className={styles.login-section_google-login-btn}
                        //     >
                        //       Iniciar sesión con Google
                        //     </button>
                        //   )}
                        buttonText="Log in with Google"
                        onSuccess={respuestaGoogle}
                        onFailure={respuestaGoogle}
                        cookiePolicy="single_host_origin"
                    // className={`${styles.loginButton} ${styles.google}`}'
                    />
                </div>
                <div className={styles.center}>
                    <div className={styles.or}>Or</div>
                </div>
                <div className={styles.right}>
                    <form className={styles.formm} onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label >Email</label>
                            <input onChange={(e) => handleInputChange(e)} value={post.email} name='email' />
                            {
                                errors.email && (<p>{errors.email}</p>)
                            }
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='password' onChange={(e) => handleInputChange(e)} value={post.password} name='password' />
                            {
                                errors.password && (<p>{errors.password}</p>)
                            }
                        </div>

                        {/* <Link to="/passwordRecover">Forgot your password?</Link> */}

                        <button className={styles.btn} type='submit'>Continue</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
