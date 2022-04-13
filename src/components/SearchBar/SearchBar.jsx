import React from 'react'
import styles from '../SearchBar/SearchBar.module.css'

export default function SearchBar (){
    return(
        <div className={styles.container}>
            <form>
                <input type='text' placeholder='What are you looking for...' />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}