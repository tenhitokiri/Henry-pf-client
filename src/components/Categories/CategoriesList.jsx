import React, { useEffect } from 'react'
//redux
import { connect } from 'react-redux'
import { fetchCategories } from '../../redux'
import styles from '../Categories/CategoriesList.module.css'

const CategoriesList = ({ fetchCategories, categoryList, loading, error, setCategory, selectedCategory }) => {
    useEffect(() => {
        fetchCategories()
    }, []) //eslint-disable-line

    const categoryMarkup = loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        categoryList.map(category => (
            category === selectedCategory ? (
                <li key={category.id} onClick={() => setCategory("")} className={styles.selected}> {`> ${category}`} </li>) : (
                <li key={category.id} onClick={() => setCategory(category)}>{category}</li>
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
    categoryList: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error,
})

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)