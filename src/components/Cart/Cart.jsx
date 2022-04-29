import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../redux'
import CartProduct from './CartProduct'
import { FormatMoney } from 'format-money-js';
import styles from './Cart.module.css'
import { NavLink } from 'react-router-dom'

export const Cart = ({ numberOfItems, totalPrice, discountCoupon, discountAmount, addToCart, cartItems }) => {
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(totalPrice)) || totalPrice

    const listMarkup = cartItems.length > 0 ? (cartItems.map(product => (
        <CartProduct key={product.id} product={product} />
    )))
        : (<div className={styles.addProducts}>
            Add some products to cart
            <span>&nbsp;</span>
            <NavLink to={'/products'}>
                <button className={styles.button}>
                    All products
                </button>
            </NavLink>
        </div>)

    return (
        <div className={styles.container}>
            <div className={styles.titlePage}>
                {
                    numberOfItems === 0 ? <span>Shopping Cart empty</span> :
                        numberOfItems >= 1 ? <span>Shopping Cart ({numberOfItems} items)</span> : <span>Carrito de Compras ({numberOfItems} item)</span>
                }
            </div>
            {
                totalPrice > 0 ?
                    <div className={styles.summary}>
                        <div className={styles.titleSummary}>
                            Summary
                            <br /><br />
                            Order Total: <span>{prodPrice}</span>
                        </div>
                        <button className={`${styles.buttonSuccess}`}>Proceed to Checkout</button>
                    </div>
                    : null
            }
            <div className={styles.productList}>
                {listMarkup}
                {
                    listMarkup.length > 0 ? <button className={`${styles.buttonSuccess} ${styles.continue}`}>Continue Shopping</button> :
                        <div></div>
                }
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems,
        numberOfItems: state.cart.numberOfItems,
        totalPrice: state.cart.totalPrice,
        discountCoupon: state.cart.discountCoupon,
        discountAmount: state.cart.discountAmount,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (number) => dispatch(addToCart(number))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
//export default connect(mapStateToProps)(Cart)
