import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './modalOptions.module.css'
import { orderBy } from '../../utils'
import { addToCart, removeFromCart } from '../../redux'

const ModalOptions = ({ modalOptions, product_id, name, image, rating }) => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch()
    const buyingOptions = useSelector(state => state.products.foundProducts.sellers).sort((a, b) => orderBy(a.stock.unit_price, b.stock.unit_price))

    console.log(buyingOptions, '<----buyingSort')

    const addCart = (element) => {
        if (element) {
            console.log(element, '<------ soy element')
            if (count !== 0) {
                const payload = {
                    product_id, name,
                    inventoryQty: element.stock.quantity, price: element.stock.unit_price,
                    image,
                    rating, itemsToBuy: count
                }
                console.log(payload, '<-----payloadCart')
                dispatch(addToCart(payload))
            } else {
                dispatch(removeFromCart({ product_id }))
            }
        }
    }

    return (
        <div className={styles.backgroundModal}>
            <div className={styles.modalContent}>
                <button
                    className={styles.closeModal}
                    onClick={() => { modalOptions(false) }}
                >x</button>
                <h4>All buying options</h4>
                {
                    buyingOptions.map(element => (
                        <div key={element.user_id} className={styles.optionSeller}>
                            <span className={styles.sellerName}>sold by: <b>{element.user_id}</b></span>
                            <div className={styles.cardSeller}>
                                <div>${element.stock.unit_price}</div>
                                <div>avaible units: {element.stock.quantity}</div>
                                <div className={styles.contentCount}>
                                    <button className={styles.incDec} onClick={() => { if (count > 0) { setCount(count - 1) } }}>-</button>
                                    <div className={styles.count} >{count}</div>
                                    <button className={styles.incDec} onClick={() => { if (count < element.stock.quantity) { setCount(count + 1) } }}>+</button>
                                </div>
                                <button className={styles.cart} onClick={() => { addCart(element) }}>Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ModalOptions