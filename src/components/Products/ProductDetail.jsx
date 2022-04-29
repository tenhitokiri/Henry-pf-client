import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../redux/Products/productActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import styles from './productDetail.module.css'
import ProductCarrousel from '../Carrousel/ProductCarrousel'
import usePaginate from '../../hooks/usePaginate'
import { addToCart, addToWL, removeFromWL, removeFromCart } from '../../redux'
import ModalOptions from './ModalOptions'
import { FormatMoney } from 'format-money-js';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const related = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)
    const favoriteProducts = useSelector(state => state.wishList.wishListItems)
    const { prevPage, nextPage, items } = usePaginate(related, 10)
    const [render, setRender] = useState(false)
    const [modalOptions, setModalOptions] = useState(false)
    const user_id = useSelector(state => state.loggin.loggin.id)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [render])

    let {
        product_id,
        name,
        rating,
        images,
        featured_seller,
        stock,
        description,
        sellers
    } = useSelector(state => state.products.foundProducts)

    //inventoryQty = inventoryQty || generateRandomInt(100) + 1;
    const image = images || 'https://via.placeholder.com/150'
    const price = featured_seller?.stock?.unit_price;
    const seller_id = featured_seller?.user_id
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(price)) || price


    if (rating) {
        var star = Math.floor(rating)
    }

    const onClick = () => {
        setRender(!render)
    }

    const [counter, setCounter] = useState(0)
    const increment = () => {
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
                stock, price,
                image, rating, seller_id
            }
            dispatch(addToCart(payload, user_id))
        } else {
            dispatch(removeFromCart({ product_id }))
        }
    }

    const addWL = () => {
        const payload = {
            product_id, name,
            stock, price,
            image, rating, seller_id
        }
        dispatch(addToWL(payload, user_id))
    }
    const removeWL = () => {
        const payload = {
            product_id, name,
            stock, price,
            image, rating, seller_id
        }
        dispatch(removeFromWL(payload, user_id))
    }

    const isFavorite = (id) => {
        const isFav = favoriteProducts && favoriteProducts.find(item => item.product_id === id)
        return isFav ? (<button className={styles.wish} onClick={removeWL}>Delete From wishlist</button>)
            : (<button className={styles.wish} onClick={addWL}>Add to wishlist</button>
            )
    }


    return loading ? (
        <div className='App-container'>
            <div className="loader"></div>
        </div>
    ) : error ? (
        <div>{error}</div>
    ) :
        (
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
                                <img className={styles.img} src={images[0]} alt='' />
                            }
                            <div className={styles.contentPSD}>
                                <div className={styles.price}>{prodPrice}</div>
                                <div className={styles.stock}>{stock} available</div>
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
                                <button className={styles.options} onClick={(e) => { setModalOptions(true) }}>See all buying options</button>
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
                {
                    modalOptions &&
                    <ModalOptions
                        modalOptions={setModalOptions}
                        product_id={product_id}
                        name={name}
                        image={images}
                        rating={rating}
                    />
                }
            </div>
        )
}

export default ProductDetail