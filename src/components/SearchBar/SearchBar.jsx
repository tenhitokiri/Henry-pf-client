import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../SearchBar/SearchBar.module.css'
import { fetchProductByName } from '../../redux/Products/productActions'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchProductByName(input))
        navigate('/find-product')
    }

    const onkeyIntro = (e) => {
        if (e.keyCode === 13) {
            onSubmit(e)
            navigate('/find-product')
        }
    }


    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    onKeyDown={onkeyIntro}
                    value={input}
                    type='text'
                    placeholder='What are you looking for...'
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}