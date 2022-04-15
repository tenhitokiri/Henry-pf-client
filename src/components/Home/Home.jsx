import React from 'react'
import Slider from '../Slider/Slider'
import styles from '../Home/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faRotate } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import CategoriesList from '../Categories/CategoriesList'

const Home = () => {
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
        </div>
    )
}

export default Home