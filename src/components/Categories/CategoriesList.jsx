import React from 'react'
//redux
import { connect } from 'react-redux'
import styles from '../Categories/CategoriesList.module.css'

const CategoriesList = ({ fetchCategories, categoryList, loading, error, setCategory, selectedCategory }) => {
    const categoryMarkup = loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        categoryList.map((category, id) => (
            category.name === selectedCategory.name || category.parent_name === selectedCategory.name ? (
                <li key={id} onClick={() => setCategory("")} className={styles.selected}> {`> ${category.name}`} </li>) : (
                <li key={id} onClick={() => setCategory(category)}>{category.name}</li>
            )
        ))
    )

    return (
        <div className={styles.container}>
            <h2>Categories</h2>
            <ul>
                {categoryMarkup}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    categoryList: state.categories.categories_detail,
    loading: state.categories.loading,
    error: state.categories.error,
})

export default connect(mapStateToProps)(CategoriesList)