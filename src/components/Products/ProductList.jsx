import React from 'react'
//redux
import styles from './Product.module.css'
import ProductCard from './ProductCard'

const ProductList = ({ productList }) => {

    const productMarkup = productList.length ? (
        productList.map(product => (
            <ProductCard key={product.id} product={product} />
        ))
    ) : (
        <div>No products found</div>
    )

    return (
        <div className={styles.products}>ProductList
            <div className={styles.pagination}>
                pagination
            </div>
            <div className={styles.listContainer}>
                {productMarkup}
            </div>
        </div>
    )
}

export default ProductList