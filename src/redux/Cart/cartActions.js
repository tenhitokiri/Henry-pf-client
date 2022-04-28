import CART_ACTIONS from './cartTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';

/* 
ACTION_CART_SUCCESS: 'ACTION_CART_SUCCESS',
ACTION_CART_FAILURE: 'ACTION_CART_FAILURE',
ACTION_CART_REQUEST: 'ACTION_CART_REQUEST',
FETCH_CART_ITEMS: 'FETCH_CART_ITEMS',
SET_CART_ITEMS: 'SET_CART_ITEMS',
 */
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

const fetchCartItemsRequest = () => {
    return {
        type: CART_ACTIONS.ACTION_CART_REQUEST
    }
}

//Failure for action
const fetchCartItemsFailure = (error) => {
    return {
        type: CART_ACTIONS.ACTION_CART_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const fetchCartItemsSuccess = (cart) => {
    return {
        type: CART_ACTIONS.ACTION_CART_SUCCESS,
        payload: cart
    }
}

export const fetchCartItems = (userId) => {
    return (dispatch) => {
        dispatch(fetchCartItemsRequest());
        return axios.get(`${backendUrl}/cart/${userId}`)
            .then(response => {
                const cart = response.data;
                dispatch(fetchCartItemsSuccess(cart));
            })
            .catch(error => dispatch(fetchCartItemsFailure(error)));
    };
}

const setCartItemsRequest = () => {
    return {
        type: CART_ACTIONS.ACTION_CART_REQUEST
    }
}

//Failure for action
const setCartItemsFailure = (error) => {
    return {
        type: CART_ACTIONS.ACTION_CART_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const setCartItemsSuccess = (cart) => {
    return {
        type: CART_ACTIONS.SET_CART_ITEMS,
        payload: cart
    }
}

export const getCartItems = (userId) => {
    // console.log("getting CartItems")
    const savedCartItems = JSON.parse(localStorage.getItem('savedCartItems')) === true;
    let cart = [];
    if (savedCartItems) {
        // console.log("should find saved cart items");
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    return (dispatch) => {
        if (!userId && savedCartItems) {
            // console.log("saving local cart items to redux");
            dispatch(setCartItemsSuccess(cart));
        }
        if (userId) {
            return axios.get(`${backendUrl}/cart/${userId}`)
                .then(response => {
                    const cart = response.data;
                    dispatch(setCartItemsSuccess(cart));
                    localStorage.setItem('cart', cart);
                    localStorage.setItem('savedCartItems', true);
                })
                .catch(error => {
                    console.log(error);
                    dispatch(setCartItemsFailure(error));
                });
        }
    };
}
