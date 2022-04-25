import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './nav.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchProductByCategory, fetchDetailCategories, fetchProducts } from '../../redux'


const Nav = () => {
    const categories = useSelector(state => state.categories.categories_detail)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false)

    const onClick = () => {
        setToggle(!toggle)
    }
    const onCategory = (e) => {
        onClick()
        dispatch(fetchProductByCategory(e.target.id))
        navigate('/products')
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
                                categories.map(e => (
                                    <li onClick={onCategory} id={e.name} key={e.name} className={styles.li}>{e.name}</li>

                                ))
                            }
                            <li className={styles.li} onClick={onCategoryReset}>all</li>
                        </ul>
                    }
                </label>

                <NavLink className={styles.link} to={'/add-product'}>Sell</NavLink>
                <NavLink className={styles.link} to={'/panels'}>User</NavLink>
            </div>
        </div>
    )
}

export default Nav