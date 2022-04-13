import React from 'react'
import style from './footer.module.css'

const Footer = () => {
    return (
        <div className={style.container}>
            <span className={style.span}>© 2022 Hubazar. All Rights Reserved</span>
            <div className={style.div}>
                <span className={style.span2}>Safe payment with:</span>
                <img className={style.img} src='https://www.pinpng.com/pngs/m/424-4241166_mercado-pago-logo-png-volkswagen-fox-transparent-png.png' alt='payments' />
            </div>
        </div>
    )
}

export default Footer