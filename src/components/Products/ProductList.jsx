import React from 'react'
import { orderBy } from '../../utils/'
import styles from './Product.module.css'
import ProductCard from './ProductCard'
import CategoriesList from '../Categories/CategoriesList'
//import Paginate from '../Paginate/Paginate'
import Pagination from '../Paginate/Pagination'
import { PRODUCTS_PER_PAGE } from '../../env'

const ProductList = ({ productList }) => {

    const [search, setSearch] = React.useState('')
    const [order, setOrder] = React.useState('')
    const [category, setCategory] = React.useState('')

    let productsPerCategory = category.length > 0 ? productList.filter(product => product.category === category) : productList

    let filteredProducts = search.length === 0 ? productsPerCategory :
        productsPerCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))

    switch (order) {
        case 'nameAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.title.toLowerCase(), b.title.toLowerCase()))
            break;
        case 'nameDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.title.toLowerCase(), a.title.toLowerCase()))
            break;
        case 'scoreAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.rating.rate, b.rating.rate))
            break;
        case 'scoreDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.rating.rate, a.rating.rate))
            break;
        default:
            break;
    }

    const pages = filteredProducts.length ? Math.round(filteredProducts.length / PRODUCTS_PER_PAGE) : 0

    return (
        <div className={styles.container}>
            <div className={styles.menuList}>
                <div className={styles.productList}>
                    <h3>Filtros</h3>
                    <input
                        title="search"
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={(e) => setSearch('')}>clear</button>
                    <select title="order" onChange={(e) => setOrder(e.target.value)}>
                        <option value="">Order by...</option>
                        <option value="nameAsc">title Ascending</option>
                        <option value="nameDesc">title Descending</option>
                        <option value="scoreAsc">Score Ascending</option>
                        <option value="scoreDesc">Score Descending</option>
                    </select>
                </div>
                <CategoriesList selectedCategory={category} setCategory={setCategory} />
            </div>

            <div className={styles.productsContainer}>
                <Pagination
                    data={filteredProducts}
                    RenderComponent={ProductCard}
                    pageLimit={pages}
                    dataLimit={PRODUCTS_PER_PAGE}
                />
            </div>
        </div>
    )
}

export default ProductList