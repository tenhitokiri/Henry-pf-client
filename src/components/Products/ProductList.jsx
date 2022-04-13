import React from 'react'
//redux

const ProductList = ({ productList }) => {

    const productMarkup = productList.length ? (
        productList.map(product => (
            <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
            </div>
        ))
    ) : (
        <div>No products found</div>
    )

    return (
        <div>ProductList
            {productMarkup}
        </div>
    )
}

export default ProductList