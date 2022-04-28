import CART_ACTIONS from './cartTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

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

export const checkOutCart = (userId, external_reference) => {
    return (dispatch) => {
        dispatch(checkoutRequest());
        return axios.post(`${backendUrl}/mp_confirmation/?external_reference=${external_reference}`)
            .then(axios.delete(`${backendUrl}/cart/all/${external_reference}`, { body: { id: external_reference } })
                .then((data) => {
                    console.log("RESPONSE: ", data)
                    dispatch(checkoutSuccess(data));
                })
                .catch(error => dispatch(checkoutFailure(error))));
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
        //console.log("should find saved cart items");
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    return (dispatch) => {
        if (!userId && savedCartItems) {
            // console.log("saving local cart items to redux");
            //console.log("saving local cart items to redux");
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
