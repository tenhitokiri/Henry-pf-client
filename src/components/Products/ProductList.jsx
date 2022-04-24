import React from 'react'
import { orderBy } from '../../utils/'
import styles from './Product.module.css'
import ProductCard from './ProductCard'
import CategoriesList from '../Categories/CategoriesList'
import Pagination from '../Paginate/Pagination'
import { PRODUCTS_PER_PAGE } from '../../env'
import { useSelector } from 'react-redux'


const ProductList = ({ productList }) => {
    const categoryList = useSelector(state => state.categories.categories_detail)

    const [search, setSearch] = React.useState('')
    const [order, setOrder] = React.useState('')
    const [category, setCategory] = React.useState('')

    const foundParentName = (element) => {
        const result = categoryList.find(e => {
            return e.name === element
        })
        return result
    }
    console.log(categoryList, '< cat list')

    let productsPerCategory = category?.name?.length > 0 ? productList.filter(product => {

        console.log('<---------------------')
        console.log(product.name, product.category_name,)
        console.log(foundParentName(product.category_name))
        console.log('<---------------------')
        return (
            product.category_name === category.name
            ||
            foundParentName(product.category_name) === category.parent_name)

    })
        : productList



    let filteredProducts = search.length === 0 ? productsPerCategory :
        productsPerCategory.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

    console.log(productsPerCategory, '<---------')
    switch (order) {
        case 'nameAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.name.toLowerCase(), b.name.toLowerCase()))
            break;
        case 'nameDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.name.toLowerCase(), a.name.toLowerCase()))
            break;
        case 'scoreAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.rating, b.rating))
            break;
        case 'scoreDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.rating, a.rating))
            break;
        case 'priceAsc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(a.price, b.price))
            break;
        case 'priceDesc':
            filteredProducts = filteredProducts.sort((a, b) => orderBy(b.price, a.price))
            break;
        default:
            break;
    }

    const pages = filteredProducts.length ? Math.round(filteredProducts.length / PRODUCTS_PER_PAGE) : 0

    return (
        <div className={styles.container}>
            <div className={styles.menuList}>
                <div className={styles.filters}>
                    <h3>FILTER</h3>
                    <input
                        name="search"
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={(e) => setSearch('')}>clear</button>
                    <select name="order" onChange={(e) => setOrder(e.target.value)}>
                        <option value="">Order by...</option>
                        <option value="nameAsc">name Ascending</option>
                        <option value="nameDesc">name Descending</option>
                        <option value="scoreAsc">Score Ascending</option>
                        <option value="scoreDesc">Score Descending</option>
                        <option value="priceAsc">Price Ascending</option>
                        <option value="priceDesc">Price Descending</option>
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