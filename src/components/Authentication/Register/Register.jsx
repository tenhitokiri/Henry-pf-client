import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addCUSTOMER } from '../../../redux/User/Register/registerActions';
import styles from '../../Authentication/Register/Register.module.css';

function checkErrors(post){
    let errors = {};
    if(!post.name){
        errors.name = 'Please provide a name'
    }

    // if(!post.lastName){
    //     errors.lastName = 'Please provide a lastname'
    // }

    if(!post.email){
        errors.email = 'Please provide an email'
    }
    
    if(!post.password){
        errors.password = 'Please provide a password'
    }
    
    return errors;
}


export default function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({
        name: '',
        email:'',
        password:'',
    })

    function handleSubmit(e){
        e.preventDefault();
        if(Object.values(errors).length>0) return alert('Please provide the required info');
        else if(!post.name || !post.password) return alert('Please provide the required info');
        else{
            dispatch(addCUSTOMER(post))
            alert('Please check your email to validate your account')
            navigate('/')
        }
    }

    function handleInputChange(e){
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
                <h2 className={styles.titleSignUp}>Create account</h2>
                    <form className={styles.formm} onSubmit = {(e) => handleSubmit(e)}>
                        <div>
                            <label >Name</label>
                            <input type="text" onChange={(e) => handleInputChange(e)} value={post.name} name="name"/>
                            {
                                errors.name && (<p>{errors.name}</p>)
                            }
                        </div>
                        <div>
                            <label >Email</label>
                            <input  onChange={(e) => handleInputChange(e)} value= {post.email} name = 'email'/>
                            {
                                errors.email && (<p>{errors.email}</p>)
                            }
                        </div>
                        <div>
                            <label >Password</label>
                            <input  onChange={(e) => handleInputChange(e)} value= {post.password} name = 'password'/>
                            {
                                errors.password && (<p>{errors.password}</p>)
                            }
                        </div>
                        
                        <button type ='submit'>Continue</button>
                    </form>
                    <Link to="/">
                        <button className={styles.btn}>Home</button>
                    </Link>
               </div>

    )
}


