import CATEGORY_ACTIONS from './categoryTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

//Request for action
const actionCategoriesRequest = () => {
    return {
        type: CATEGORY_ACTIONS.ACTION_CATEGORIES_REQUEST
    }
}

//Failure for action
const actionCategoriesFailure = (error) => {
    return {
        type: CATEGORY_ACTIONS.ACTION_CATEGORIES_FAILURE,
        payload: error
    }
}

//success for fetching all Categories
const fetchAllCategoriesSuccess = (Categories) => {
    return {
        type: CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES_SUCCESS,
        payload: Categories
    }
}

//Fetch all Categories
export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(actionCategoriesRequest())
        let api = backendUrl + 'products/categories'
        console.log(`fetchCategories: ${api}`)
        axios.get(api)
            .then(response => {
                const Categories = response.data
                dispatch(fetchAllCategoriesSuccess(Categories))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionCategoriesFailure(msg))
            })
    }
}