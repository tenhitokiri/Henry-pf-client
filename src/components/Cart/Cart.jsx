import React from 'react'
import { connect } from 'react-redux'
/* import { addToCart } from '../../redux'
 */
import CartProduct from './CartProduct'
import { FormatMoney } from 'format-money-js';


export const Cart = (props) => {

    const { items, products, totalToPay } = props
    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseInt(totalToPay)) || totalToPay

    const listMarkup = products.length > 0 ? (products.map(product => (
        <CartProduct key={product.id} product={product} />
    )))
        : (<div className="container">No Hay productos</div>)

    return (
        <div className="ModuleContainer">
            <div className="Title">
                {
                    items === 0 ? <h1>Carrito de Compras Vacio</h1> :
                        items > 1 ? <h1>Carrito de Compras ({items} items)</h1> : <h1>Carrito de Compras ({items} item)</h1>
                }
            </div>
            <div className="ProductList">
                {listMarkup}
            </div>
            {
                totalToPay > 0 ?
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
        items: state.cart.numberOfItems,
        products: state.cart.cartItems,
        totalToPay: state.cart.totalPrice
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
