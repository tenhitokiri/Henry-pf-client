import React, { useEffect } from 'react'
//redux
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux'
import ProductList from './ProductList'

const ProductListAll = ({ fetchProducts, productList, loading, error }) => {
    useEffect(() => {
        fetchProducts()
        console.log(productList);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const productMarkup = loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        productList.map(product => (
            <ProductList productList={productList} />
        ))
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
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductListAll)