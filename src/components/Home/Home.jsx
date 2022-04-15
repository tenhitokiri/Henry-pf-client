import React, { useState, useEffect } from 'react'
import Slider from '../Slider/Slider'
import styles from '../Home/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faRotate } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import ProductCarrousel from '../Carrousel/ProductCarrousel'
import { useSelector } from 'react-redux'

const Home = () => {
    //featured products
    const products = useSelector(state => state.products.products)
    const ftProducts = products.sort((a, b) => {
        if (a.rating.count < b.rating.count) {
            return 1;
        }
        if (a.rating.count > b.rating.count) {
            return -1;
        }
        return 0;
    });
    //state paginate ft products
    const [ftPagined, setFtPagined] = useState(0);

    let rFtProducts = ftProducts.slice(ftPagined, ftPagined + 3);

    const nextFtPagined = () => {
        setFtPagined(ftPagined === 9 ? 0 : ftPagined + 3)
    }

    useEffect(() => {
        setTimeout(() => {
            nextFtPagined()
        }, 3000);
    })


    //latest products
    const ltProducts = products.sort((a, b) => {
        if (a.rating.rate < b.rating.rate) {
            return 1;
        }
        if (a.rating.rate > b.rating.rate) {
            return -1;
        }
        return 0;
    });
    //state paginate lt products
    const [ltPagined, setLtPagined] = useState(0)
    let rLtProducts = ltProducts.slice(ltPagined, ltPagined + 3)

    const nextLtPagined = () => {
        setLtPagined(ltPagined === 9 ? 0 : ltPagined + 3)
    }

    useEffect(() => {
        setTimeout(() => {
            nextLtPagined()
        }, 3000);
    })

    return (
        <div>
            <Slider />
            <CategoriesList />
            <div className={styles.iconsContainer}>
                <div className={styles.iconText}>
                    <FontAwesomeIcon className={styles.icon} icon={faRocket} size="3x" />
                    <div>
                        <span>Fast Delivery</span>
                        <br />
                        <span className={styles.textGrey}>In all our products</span>
                    </div>
                </div>
                <div className={styles.iconText}>
                    <FontAwesomeIcon className={styles.icon} icon={faRotate} size="3x" />
                    <div>
                        <span>60 Days Return</span>
                        <br />
                        <span className={styles.textGrey}>If have any problem</span>
                    </div>
                </div>
                <div className={styles.iconText}>
                    <FontAwesomeIcon className={styles.icon} icon={faCreditCard} size="3x" />
                    <div>
                        <span>Secure Payment</span>
                        <br />
                        <span className={styles.textGrey}>100% secure payment</span>
                    </div>
                </div>
            </div>
            <div className={styles.titleContein}>
                <div className={styles.ftTitle}>Featured Products</div>
                <div className={styles.ltTitle}>Latest Products</div>
            </div>
            <div className={styles.carrousels}>
                <div className={styles.ft}>
                    {
                        rFtProducts ? rFtProducts.map(e => (
                            <ProductCarrousel key={e.title} image={e.image} title={e.title} rating={e.rating.rate} price={e.price} />
                        )) : null
                    }
                </div>
                <div className={styles.lt}>
                    {
                        rLtProducts ? rLtProducts.map(e => (
                            <ProductCarrousel key={e.title} image={e.image} title={e.title} rating={e.rating.rate} price={e.price} />
                        )) : null
                    }
                </div>

            </div>
        </div>
    )
}

export default Home