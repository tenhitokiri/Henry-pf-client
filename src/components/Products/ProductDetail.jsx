import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../redux/Products/productActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import styles from './productDetail.module.css'
import ProductCarrousel from '../Carrousel/ProductCarrousel'
import usePaginate from '../../hooks/usePaginate'
import { addToCart, addToWL, removeFromWL, removeFromCart } from '../../redux'

import { generateRandomInt } from '../../utils'


const ProductDetail = ({ favoriteProducts }) => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const related = useSelector(state => state.products.products)
    const { prevPage, nextPage, items } = usePaginate(related, 10)
    const [render, setRender] = useState(false)


    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [render])

    let { product_id, name, description, stock, rating, amount_sold, price, images, category, inventoryQty } = useSelector(state => state.products.foundProducts)

    inventoryQty = inventoryQty || generateRandomInt(100) + 1;


    if (rating) {
        var star = Math.floor(rating)
    }

    const onClick = () => {
        setRender(!render)
    }
    /////////////////

    const [counter, setCounter] = useState(0)
    const increment = () => {
        /* if ((stock - counter) > 0) {
         }
         */
        setCounter(counter + 1)

    }
    const decrement = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }

    const addCart = () => {
        if (counter !== 0) {
            const payload = {
                product_id, name,
                inventoryQty, price,
                image,
                rating, itemsToBuy: counter
            }
            dispatch(addToCart(payload))
        } else {
            dispatch(removeFromCart({ product_id }))
        }
    }

    /////////////////
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
        return isFav ? (<button className={styles.wish} onClick={removeWL}>Delete From wishlist</button>)
            : (<button className={styles.wish} onClick={addWL}>Add to wishlist</button>
            )
    }

    const image = images[0] || 'https://via.placeholder.com/150'

    return (
        <div className={styles.background}>
            {
                name &&
                <div className={styles.content}>
                    <div className={styles.category} >category</div>
                    <div className={styles.title}>{name}</div>
                    {
                        rating &&
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
                    }
                    <div className={styles.detail}>
                        {
                            images.length > 1 ? images.map((e, i) => (
                                <img key={i} alt='' src={images[i]} />

                            )) :
                                <img className={styles.img} src={images[0]} alt='' />
                        }
                        <div className={styles.contentPSD}>
                            <div className={styles.price}>${price}</div>
                            <div className={styles.stock}>{stock}</div>
                            <div className={styles.description}>{description}</div>
                        </div>
                        <div className={styles.add}>
                            <div className={styles.box}>
                                <button className={styles.decrement} onClick={decrement}>-</button>
                                <div className={styles.counter}>{counter}</div>
                                <button className={styles.increment} onClick={increment}>+</button>
                            </div>
                            <button className={styles.cart} onClick={addCart}>Add to cart</button>
                            {isFavorite(product_id)}
                            {/* 
                            <button className={styles.wish}>Add to wishlist</button>
 */}
                        </div>
                    </div>
                </div>
            }
            <div className={styles.related}>
                <FontAwesomeIcon className={styles.prev} onClick={prevPage} icon={faAngleLeft} />
                <div className={styles.carrousel} onClick={onClick}>
                    {
                        items ? items.map((e, i) => (

                            <ProductCarrousel key={e.name + 'asd' + i} id={e.product_id} image={e.images} name={e.name} rating={e.rating} price={e.price} />

                        ))
                            : <span>loading...</span>
                    }
                </div>
                <FontAwesomeIcon className={styles.next} onClick={nextPage} icon={faAngleRight} />
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    favoriteProducts: state.wishList.wishListItems,
})

export default connect(mapStateToProps)(ProductDetail)