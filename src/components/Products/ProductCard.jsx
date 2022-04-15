import React from 'react'
import styles from './Product.module.css'
import useCounter from '../../hooks/UseCounter';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux'
import { FormatMoney } from 'format-money-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import { faCartArrowDown, faCircleMinus, faCircleXmark, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons'

const ProductCard = ({ product }) => {

    const { id, title,
        price, image, rating } = product;
    const star = Math.floor(rating.rate)

    const inventoryQty = product.inventoryQty || 100;
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price

    const dispatch = useDispatch()
    let itemsToBuy = 0
    const addCart = () => {
        const payload = {
            id, title,
            inventoryQty, price,
            image, rating, itemsToBuy
        }
        dispatch(addToCart(payload))
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
            <div className={styles.ButtonGroup}>
                <button className={`${styles.Button}, ${styles.ButtonRegular}`} onClick={add} ><FontAwesomeIcon icon={faCirclePlus} /></button>
                <div className={styles.ButtonGroup}>
                    <span className={styles.Badge} >{count}</span>
                </div>
                <button className={`${styles.Button}, ${styles.ButtonRegular}`} onClick={remove} ><FontAwesomeIcon icon={faCircleMinus} /></button>
                <button className={`${styles.Button}, ${styles.ButtonReset}`} onClick={resetCount} ><FontAwesomeIcon icon={faCircleXmark} /></button>
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
                <div className={styles.cardPrice}>{prodPrice} ({inventoryQty} available)</div>
                <div className={styles.rate}>
                    {
                        [...Array(star)].map((e, index) => {
                            return <FontAwesomeIcon key={index} icon={faStar} />
                        })
                    }
                    {
                        [...Array(5 - star)].map((e, index) => {
                            return <FontAwesomeIcon key={index.toString() + 'b'} icon={starReg} />
                        })
                    }
                </div>
            </div>
            <div className={styles.cardFooter}>
                <FontAwesomeIcon className={styles.icon} icon={faHeart} />

                <div className={styles.ButtonGroup}>
                    <button className={`${styles.Button}, ${styles.ButtonSuccess}`} onClick={addCart}> <FontAwesomeIcon className={styles.icon} icon={faCartArrowDown} /></button>
                    <Buttons initialCount={0} value={1} max={inventoryQty} itemsToBuy={itemsToBuy} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard