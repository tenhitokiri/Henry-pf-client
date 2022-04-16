import React from 'react'
//redux
import styles from './Product.module.css'
import ProductCard from './ProductCard'
import CategoriesList from '../Categories/CategoriesList'

const ProductList = ({ productList }) => {

    const productMarkup = productList.length ? (
        productList.map(product => (
            <ProductCard key={product.id} product={product} />
        ))
    ) : (
        <div>No products found</div>
    )

    return (
        <div className={styles.container}>
            <CategoriesList />
            <div className={styles.productsContainer}>
                <div className={styles.listContainer}>
                    {productMarkup}
                </div>
                <div className={styles.pagination}>
                    pagination
                </div>
            </div>
        </div>
    )
}

export default ProductList