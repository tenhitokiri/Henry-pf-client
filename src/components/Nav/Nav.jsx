import React from 'react'
import styles from './nav.module.css'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <div className={styles.background}>
            <div className={styles.conteiner} >
                <NavLink className={styles.link} to={'/'}>Home</NavLink>
                <NavLink className={styles.link} to={'/products'}>Featured Products</NavLink>
                <div className={styles.link}>Dropdown</div>
                <NavLink className={styles.link} to={'/add-product'}>Sell</NavLink>
            </div>
        </div>
    )
}

export default Nav