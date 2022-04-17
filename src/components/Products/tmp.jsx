import React from 'react'
import styles from './Product.module.css'
import useCounter from '../../hooks/UseCounter';
//import { addToCart, initCartState } from '../Cart/CartFunctions'
import { FormatMoney } from 'format-money-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus, faCircleXmark, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons'
//import useLocalStorage from '../../hooks/UseLocalStorage';

const ProductCard = ({ product }) => {

    const { id, title,
        price, image, rating } = product;
    const star = Math.floor(rating.rate)

    const inventoryQty = product.inventoryQty || 100;
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price
    //const [cart, setCart] = useLocalStorage('cart', initCartState);
    let itemsToBuy = 0
    const addCart = () => {
        const payload = {
            id, title,
            inventoryQty, price,
            image, rating, itemsToBuy
        }
        //const newCart = addToCart(cart, payload)
        //console.log(newCart)
        //setCart(newCart)
        //console.log("Cart Content:")
        //console.log(cart)
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
                <img src={image} alt={title} className={styles.img} />
            </div>
            <div className={styles.cardBody}>
                <div className={styles.title}>{title.length > 40 ? (title.substring(0, 40) + "...") : title} </div>
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
                <FontAwesomeIcon className={styles.iconHearth} icon={faHeart} />
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


export default ProductCard