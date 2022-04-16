import React from 'react'
import useCounter from '../../hooks/UseCounter';
import { useDispatch } from 'react-redux'
import { updateCartItem, removeFromCart } from '../../redux'
import { FormatMoney } from 'format-money-js';
import styles from './Cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus, faCircleXmark, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons'


function CartProduct({ product, size }) {
    const {
        id, title,
        inventoryQty, price,
        image, itemsToBuy
    } = product

    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseInt(price)) || price

    let newCount = itemsToBuy
    const dispatch = useDispatch()
    const updateCart = () => {
        const payload = {
            id,
            price,
            itemsToBuy: newCount
        }
        dispatch(updateCartItem(payload))
    }
    const removeCartItem = () => {
        const payload = {
            id
        }
        dispatch(removeFromCart(payload))
    }

    const Buttons = ({ initialCount, value, max }) => {
        const [count, increment, decrement, reset] = useCounter(initialCount, value, max)
        const add = () => {
            increment()
            newCount = count + value > max ? max : count + value
        }
        const remove = () => {
            decrement()
            newCount = count - value < 0 ? 0 : count - value
        }
        const resetCount = () => {
            reset()
            newCount = 0
        }
        return (
            <div className={styles.buttonGroup}>
                <button className={`${styles.buttonAdd}`} onClick={add} ><FontAwesomeIcon icon={faCirclePlus} /></button>
                <button className={`${styles.buttonRemove}`} onClick={remove} ><FontAwesomeIcon icon={faCircleMinus} /></button>

                <div className={styles.buttonsStock}>

                    <span className={styles.badge} >{count}</span>
                </div>
                <button className={`${styles.buttonReset}`} onClick={removeCartItem} ><FontAwesomeIcon icon={faCircleXmark} /></button>

            </div >
        )
    }

    return (
        <div className={styles.cardItem} key={id} >
            <div className={styles.cardHeader}>
                <img src={image} alt={id} className={styles.img} />
            </div>
            <div className={styles.title}><h1>{title}</h1></div>
            <div className={styles.cardFooter}>
                <p>
                    Existencia: <span>{inventoryQty} Item(s)</span><br />
                </p>
                <div className={styles.cardFooter}>
                    <div className="CardPrice ">
                        Precio: <span> {prodPrice} </span>
                    </div>
                    <Buttons initialCount={itemsToBuy} value={1} max={inventoryQty} />
                    <button className={`${styles.buttonSuccess}`} onClick={updateCart}>Update cart</button>

                </div>
            </div>
        </div>
    )
}
export default CartProduct
