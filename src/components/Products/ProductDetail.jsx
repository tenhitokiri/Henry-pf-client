import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../redux/Products/productActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons'
import styles from './productDetail.module.css'
import ProductCarrousel from '../Carrousel/ProductCarrousel'
import usePaginate from '../../hooks/usePaginate'

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const related = useSelector(state => state.products.products)
    const { prevPage, nextPage, items } = usePaginate(related, 10)

    useEffect(() => {
        dispatch(fetchProductById(id))
    })

    const { category, title, image, price, description, rating } = useSelector(state => state.products.foundProducts)

    if (rating) {
        var star = Math.floor(rating.rate)
    }

    return (
        <div className={styles.background}>
            {
                rating &&
                <div className={styles.content}>
                    <div className={styles.category} >{category}</div>
                    <div className={styles.title}>{title}</div>
                    {
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
                        <img className={styles.img} alt='categories' src={image} />
                        <div className={styles.contentPSD}>
                            <div className={styles.price}>${price}</div>
                            <div className={styles.stock}>stock</div>
                            <div className={styles.description}>{description}</div>
                        </div>
                        <div className={styles.add}></div>
                    </div>
                </div>
            }
            <button onClick={prevPage}> prev</button>
            <div className={styles.related}>
                <div className={styles.carrousel}>
                    {
                        items ? items.map(e => (
                            <ProductCarrousel key={e.title} id={e.id} image={e.image} title={e.title} rating={e.rating.rate} price={e.price} />
                        ))
                            : <span>loading...</span>
                    }
                </div>
            </div>
            <button onClick={nextPage}>next</button>
        </div>
    )
}

export default ProductDetail