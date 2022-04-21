import React from 'react'
import styles from './Product.module.css'
import useCounter from '../../hooks/UseCounter';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addToCart, addToWL, removeFromWL } from '../../redux'
import { FormatMoney } from 'format-money-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus, faCircleXmark, faCirclePlus, faStar, faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons'
import { generateRandomInt } from '../../utils'
import { Link } from 'react-router-dom';

const ProductCard = ({ product, favoriteProducts }) => {

    const { product_id,
        name,
        rating,
        price,
        images,
    } = product;


    //const star = Math.floor(rating.rate)
    const star = Math.floor(rating)

    const inventoryQty = product.inventoryQty || generateRandomInt(100) + 1;
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price
    const image = images[0] || 'https://via.placeholder.com/150'

    const dispatch = useDispatch()
    let itemsToBuy = 0
    const addCart = () => {
        const payload = {
            product_id, name,
            inventoryQty, price,
            image,
            rating, itemsToBuy
        }
        dispatch(addToCart(payload))
    }
    const addWL = () => {
        const payload = {
            product_id, name,
            inventoryQty, price,
            image, rating
        }
        dispatch(addToWL(payload))
    }
    const removeWL = () => {
        const payload = {
            product_id, name,
            inventoryQty, price,
            image, rating
        }
        dispatch(removeFromWL(payload))
    }

    const isFavorite = (id) => {
        const isFav = favoriteProducts && favoriteProducts.find(item => item.product_id === id)
        return isFav ? (<FontAwesomeIcon className={styles.iconHearthFilled} icon={heartFilled} onClick={removeWL} />)
            : (<FontAwesomeIcon className={styles.iconHearthFilled} icon={faHeart} onClick={addWL} />)
    }

    const Buttons = ({ initialCount, value, max }) => {
        const [count, increment, decrement, reset] = useCounter(initialCount, value, max)
        const add = () => {
            increment()
            itemsToBuy = count + value > max ? max : count + value
        }
        const remove = () => {
            decrement()
            itemsToBuy = count - value < 0 ? 0 : count - value
        }
        const resetCount = () => {
            reset()
            itemsToBuy = 0
        }
        return (
            <div className={styles.buttonGroup}>
                <div className={styles.buttonsStock}>
                    <button className={`${styles.buttonRemove}`} onClick={remove} ><FontAwesomeIcon icon={faCircleMinus} /></button>
                    <span className={styles.badge} >{count}</span>
                    <button className={`${styles.buttonAdd}`} onClick={add} ><FontAwesomeIcon icon={faCirclePlus} /></button>
                </div >
                <button className={`${styles.buttonReset}`} onClick={resetCount} ><FontAwesomeIcon icon={faCircleXmark} /></button>
            </div >
        )
    }

    return (
        <div className={styles.cardItem}>
            <div className={styles.cardHeader}>
                <Link className={styles.link} to={`/product/${product_id}`}>
                    <img src={image} alt={name} className={styles.img} />
                </Link>
            </div>
            <div className={styles.cardBody}>
                <Link className={styles.link} to={`/product/${product_id}`}>
                    <div className={styles.title}>{name.length > 40 ? (name.substring(0, 40) + "...") : name} </div>
                </Link>
                <div className={styles.rate}>
                    {
                        [...Array(star)].map((e, index) => {
                            return <FontAwesomeIcon className={styles.stars} key={index} icon={faStar} />
                        })
                    }
                    {
                        [...Array(5 - star)].map((e, index) => {
                            return <FontAwesomeIcon className={styles.stars} key={index.toString() + 'b'} icon={starReg} />
                        })
                    }
                </div>
                {isFavorite(product_id)}
                {/* 
                <FontAwesomeIcon className={styles.iconHearthFilled} icon={faHeart} onClick={addWL} />
                 */}
                <div className={styles.priceContainer}>
                    <span className={styles.price}>{prodPrice}</span>
                    <span className={styles.available}>({inventoryQty} available)</span></div>
            </div>
            <div className={styles.cardFooter}>
                <div>
                    <Buttons initialCount={0} value={1} max={inventoryQty} itemsToBuy={itemsToBuy} />
                    <button className={`${styles.buttonSuccess}`} onClick={addCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    favoriteProducts: state.wishList.wishListItems,
})

export default connect(mapStateToProps)(ProductCard)

