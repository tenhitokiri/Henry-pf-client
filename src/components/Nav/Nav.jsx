import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './nav.module.css'
import { NavLink } from 'react-router-dom'
import { fetchProductByCategory, fetchProducts } from '../../redux/Products/productActions'

const Nav = () => {
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false)

    const onClick = () => {
        setToggle(!toggle)
    }
    const onCategory = (e) => {

        onClick()
        dispatch(fetchProductByCategory(e.target.id.toString()))
    }
    const onCategoryReset = () => {
        dispatch(fetchProducts())
    }


    return (
        <div className={styles.background}>
            <div className={styles.conteiner} >
                <NavLink className={styles.link} to={'/'}>Home</NavLink>
                <NavLink className={styles.link} to={'/products'}>Featured Products</NavLink>
                <label className={styles.label} onClick={onClick}>Categories
                    {
                        toggle &&
                        <ul className={styles.ul}>
                            {
                                categories.categories.map(e => (
                                    <li onClick={onCategory} id={e} key={e} className={styles.li}>{e}</li>
                                ))
                            }
                            <li className={styles.li} onClick={onCategoryReset}>all</li>
                        </ul>
                    }
                </label>

                <NavLink className={styles.link} to={'/add-product'}>Sell</NavLink>
            </div>
        </div>
    )
}

export default Nav