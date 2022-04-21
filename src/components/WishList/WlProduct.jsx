import React from 'react'
import useCounter from '../../hooks/UseCounter';
import { useDispatch } from 'react-redux'
import { addToCart, removeFromWL } from '../../redux'
import { FormatMoney } from 'format-money-js';
import styles from './Cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus, faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


function WishListProduct({ product }) {
    const {
        product_id, name,
        inventoryQty, price,
        image, rating
    } = product

    //const itemsToBuy = product.quantity;

    /*     let inventoryQty = 'no';
        if (stock) {
            inventoryQty = stock
        } */


    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseInt(price)) || price

    let itemsToBuy = product.itemsToBuy || 0;
    const dispatch = useDispatch()

    const addCart = () => {
        const payload = {
            product_id, name,
            inventoryQty, price,
            image,
            rating, itemsToBuy
        }
        dispatch(addToCart(payload))
    }

    const removeWishListItem = () => {
        const payload = {
            product_id
        }
        dispatch(removeFromWL(payload))
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
                <button className={`${styles.buttonReset}`} onClick={removeWishListItem} ><FontAwesomeIcon icon={faCircleXmark} /></button>
            </div >
        )
    }

    return (
        <div className={styles.cardItem} key={product_id}>
            <div className={styles.insideContainer}>
                <div className={styles.cardHeader}>
                    <Link className={styles.link} to={`/product/${product_id}`}>

                        <img src={image} alt={product_id} className={styles.img} />
                    </Link>
                </div>
                <Link className={styles.link} to={`/product/${product_id}`}>

                    <div className={styles.cardName}>{name}</div>
                </Link>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.cardFooter}>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>{prodPrice}</span>
                        <span className={styles.available}>({inventoryQty} available)</span>
                    </div>
                    <Buttons initialCount={itemsToBuy} value={1} max={inventoryQty} />
                    <button className={`${styles.buttonSuccess}`} onClick={addCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}
export default WishListProduct
