import React from 'react'
//redux
import styles from './Product.module.css'
import ProductCard from './ProductCard'
import CategoriesList from '../Categories/CategoriesList'
import Paginate from '../Paginate/Paginate'

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
                <Paginate itemsPerPage={15} />
            </div>
        </div>
    )
}

export default ProductList