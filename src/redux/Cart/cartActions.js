import CART_ACTIONS from './cartTypes'
import { backendUrl } from '../../env.js';
import axios from 'axios'

export const loadCart = (user_id) => {
    return dispatch => {
        axios(backendUrl + 'cart/?user_id=' + user_id)
            .then(itemsCart => {
                return dispatch({
                    type: CART_ACTIONS.LOAD_CART,
                    payload: itemsCart.data
                })
            })
    }
}

export const addToCart = (payload) => {
    return {
        type: CART_ACTIONS.ADD_TO_CART,
        payload
    }
}
export const updateCartItem = (payload) => {
    return {
        type: CART_ACTIONS.UPDATE_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload
    }
}

export const emptyCart = () => {
    return {
        type: CART_ACTIONS.EMPTY_CART
    }
}

export const checkoutRequest = () => {
    return {
        type: CART_ACTIONS.CHECKOUT_REQUEST
    }
}

export const checkoutSuccess = (cart) => {
    return {
        type: CART_ACTIONS.CHECKOUT_SUCCESS,
        payload: cart
    }
}

export const checkoutFailure = (error) => {
    return {
        type: CART_ACTIONS.CHECKOUT_FAILURE,
        payload: error
    }
}