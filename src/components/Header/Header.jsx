import SearchBar from '../SearchBar/SearchBar'
import hubazarLogo from '../../assets/hubazar.png'
import styles from '../Header/Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
//import useLocalStorage from '../../hooks/UseLocalStorage';

const Header = ({ numberOfItems, cartItems }) => {

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={hubazarLogo} alt='Hubazar Logo' />
            </div>
            <div className={styles.searchBar}>
                <SearchBar />
            </div>
            <div className={styles.iconsContainer}>
                <div className={styles.icons}>
                    <FontAwesomeIcon className={styles.icon} icon={faHeart} size="2x" />
                    <div className={styles.cart}>
                        <Link to='/cart'>
                            <FontAwesomeIcon className={styles.icon} icon={faCartArrowDown} size="2x" />
                            {numberOfItems > 0 && <span className={styles.cartItems}>{numberOfItems}</span>}
                        </Link>
                    </div>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} size="2x" />
                </div>
                <div className={styles.login}>
                    <div className={styles.loginLink}>Login in</div>
                    <div className={styles.registerLink}>Register</div>
                </div>
            </div>
        </div>
    )
}

//export default Header

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    numberOfItems: state.cart.numberOfItems,
})

export default connect(mapStateToProps)(Header)