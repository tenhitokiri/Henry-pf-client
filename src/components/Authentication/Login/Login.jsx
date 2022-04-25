import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/User/Login/loginActions';
import '../../Authentication/Login/Login.css'
import { permission } from '../../../redux/';
import GoogleLogin from 'react-google-login';
import { loginGoogle } from '../../../redux/User/Login/loginActions';
import { CLIENT_ID_GOOGLE } from '../../../env';
import imgGoogle from '../../../assets/google.png'

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

    const onClick = () => {
        setSeePassword(!seePassword);
    };

    const respuestaGoogle = (respuesta) => {
        console.log(respuesta,'soy respuesta de google');
        // console.log(respuesta.profileObj),'soy profileobj';
        let userData = {
          firstName: respuesta.profileObj,
          image: respuesta.profileObj.imageUrl,
          email: respuesta.profileObj.email,
          tokenId: respuesta.tokenId,
        };
        console.log(userData,'soy user data de google');
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
        return dispatch(loginGoogle(userData));
    };

    return (
        <div className='login'>
            <h1 className='loginTitle'>Sign in here</h1>
                <div className='wrapper'>
                    <div className='left'>
                        <div className='loginButton google'>                            
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
                                // className='loginButton google'
                            />  
                        </div>
                    </div>            
                    <div className='center'>
                        <div className='line'/>
                        <div className='or'>Or</div>
                    </div>   
                    <div className='right'>
                        <form className='formm' onSubmit={(e) => handleSubmit(e)}>
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

                            {/* <Link to="/passwordRecover">Forgot your password?</Link> */}

                            <button type='submit'>Continue</button>
                        </form>
                    </div>
                </div>
        </div>

    )
}
