import React from 'react'
import styles from './Product.module.css'
import useCounter from '../../hooks/UseCounter';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux'
import { FormatMoney } from 'format-money-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus, faCircleXmark, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { generateRandomInt } from '../../utils'
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const { product_id,
        name,
        approved,
        description,
        stock,
        rating,
        amount_sold,
        price,
        images,
        category,
        added
    } = product;

    console.log("datos de producto:");
    console.log(product);
    //const star = Math.floor(rating.rate)
    const star = Math.floor(rating)

    const inventoryQty = product.inventoryQty || generateRandomInt(100) + 1;
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price

    const dispatch = useDispatch()
    let itemsToBuy = 0
    const addCart = () => {
        const payload = {
            product_id, name,
            inventoryQty, price,
            image: images[0],
            rating, itemsToBuy
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
                    <img src={images[0]} alt={name} className={styles.img} />
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