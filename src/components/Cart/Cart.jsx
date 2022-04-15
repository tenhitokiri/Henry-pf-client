import React from 'react'
import { connect } from 'react-redux'
/* import { addToCart } from '../../redux'
 */
import CartProduct from './CartProduct'
import { FormatMoney } from 'format-money-js';

/* 
const initCartState = {
    cartItems: [],
    numberOfItems: 0,
    totalPrice: 0.0,
    discountCoupon: '',
    discountAmount: 0.0
  }
 */
export const Cart = ({ cartItems, numberOfItems, totalPrice, discountCoupon, discountAmount }) => {

    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseFloat(totalPrice)) || totalPrice

    const listMarkup = cartItems.length > 0 ? (cartItems.map(product => (
        <CartProduct key={product.id} product={product} />
    )))
        : (<div className="container">No Hay productos</div>)

    return (
        <div className="ModuleContainer">
            <div className="Title">
                {
                    numberOfItems === 0 ? <h1>Carrito de Compras Vacio</h1> :
                        numberOfItems > 1 ? <h1>Carrito de Compras ({numberOfItems} items)</h1> : <h1>Carrito de Compras ({numberOfItems} item)</h1>
                }
            </div>
            <div className="ProductList">
                {listMarkup}
            </div>
            {
                totalPrice > 0 ?
                    <div className="Total">
                        <h1>Total: {prodPrice}</h1>
                    </div>
                    : null
            }
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
/* 
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (number) => dispatch(addToCart(number))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
*/
export default connect(mapStateToProps)(Cart)
