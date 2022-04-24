import React, { useEffect } from 'react'

//redux
import { connect } from 'react-redux'
import { fetchDetailCategories } from '../../redux'
import styles from '../Categories/CategoriesList.module.css'

const CategoriesList = ({ fetchDetailCategories, categoryList, loading, error, setCategory, selectedCategory }) => {
    // useEffect(() => {
    //     fetchDetailCategories()
    // }, []) //eslint-disable-line

    const categoryMarkup = loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        categoryList.map((category, id) => (
            category.name === selectedCategory ? (
                <li key={id} onClick={() => setCategory("")} className={styles.selected}> {`> ${category.name}`} </li>) : (
                <li key={id} onClick={() => setCategory(category.name)}>{category.name}</li>
            )
        ))
    )

    console.log(categoryList, 'category list.jsx')
    console.log(selectedCategory, '<-------selectedCategory------')


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

const mapDispatchToProps = dispatch => ({
    fetchDetailCategories: () => dispatch(fetchDetailCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)