import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux'
import ProductList from './ProductList'

const ProductListAll = ({ fetchProducts, productList, loading, error, cartList, numberOfItems }) => {
    useEffect(() => {
        fetchProducts()
        console.log(productList);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const productMarkup = loading ? (
        <div className='App-container'>
            <div className="loader"></div>
        </div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <ProductList productList={productList} />
    )

    return (
        <div>
            {productMarkup}
        </div>
    )
}

const mapStateToProps = state => ({
    productList: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
    cartList: state.cart.cartItems,
    numberOfItems: state.cart.numberOfItems,
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductListAll)