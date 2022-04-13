import PRODUCT_ACTIONS from './productTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

//Request for action
const actionProductsRequest = () => {
    return {
        type: PRODUCT_ACTIONS.ACTION_PRODUCTS_REQUEST
    }
}

//Failure for action
const actionProductsFailure = (error) => {
    return {
        type: PRODUCT_ACTIONS.ACTION_PRODUCTS_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const fetchAllProductsSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_ALL_PRODUCTS_SUCCESS,
        payload: Products
    }
}

//Fetch all Products
export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products'
        console.log(`fetchProducts: ${api}`)
        axios.get(api)
            .then(response => {
                const Products = response.data
                dispatch(fetchAllProductsSuccess(Products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//success for fetching some Products
const fetchProductsByNameSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_A_PRODUCT_SUCCESS,
        payload: Products
    }
}
//success for fetching a Products by id
const fetchProductByIdSuccess = (Product) => {
    return {
        type: PRODUCT_ACTIONS.FETCH_PRODUCT_ID_SUCCESS,
        payload: Product
    }
}

//Fetch one  PRODUCTs by ID
export const fetchProductById = (id) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products/' + id
        axios.get(api)
            .then(response => {
                const Products = response.data
                dispatch(fetchProductByIdSuccess(Products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}
//Fetch one  PRODUCTs by ID
export const fetchProductByName = (id) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'products/name/'
        axios.get(api)
            .then(response => {
                const Products = response.data
                dispatch(fetchProductsByNameSuccess(Products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//add the PRODUCT
const addProductSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.ADD_PRODUCT_SUCCESS,
        payload: Products
    }
}

export const addPRODUCT = (Product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'PRODUCTs/'
        console.log(`Adding PRODUCT to: ${api}`)
        axios.post(api, Product)
            .then(response => {
                dispatch(addProductSuccess(Product.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//Remove the PRODUCT
const deleteProductSuccess = (Products) => {
    return {
        type: PRODUCT_ACTIONS.DELETE_PRODUCT_SUCCESS,
        payload: Products
    }
}

export const deleteProduct = (Product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'Product/' + Product.id
        console.log(`deleting Diet with id ${Product.id} to: ${api}`)
        axios.delete(api, Product)
            .then(response => {
                dispatch(deleteProductSuccess(Product.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

//Update the Product
const updateProductSuccess = (Product) => {
    return {
        type: PRODUCT_ACTIONS.UPDATE_PRODUCT_SUCCESS,
        payload: Product
    }
}

export const updateProduct = (Product) => {
    return (dispatch) => {
        dispatch(actionProductsRequest())
        let api = backendUrl + 'Product/'
        console.log(`updating Product with id ${Product.id} to: ${api}`)
        axios.put(api, Product)
            .then(response => {
                dispatch(updateProductSuccess(Product.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionProductsFailure(msg))
            })
    }
}

export const clearSearchedProducts = () => {
    return {
        type: PRODUCT_ACTIONS.CLEAR_PRODUCT_SUCCESS
    }
}