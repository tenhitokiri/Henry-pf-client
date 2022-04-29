import React from 'react'
import styles from './modalLoginFailure.module.css'

const ModalLoginFailure = ({ msgError }) => {
    return (
        <div className={styles.modalError}>
            <div className={styles.background}>
                <span className={styles.textError}>
                    {msgError}
                </span>
            </div>
        </div>
    )
}

export default ModalLoginFailure