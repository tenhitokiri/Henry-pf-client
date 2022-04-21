import WISH_LIST_ACTIONS from './wLTypes'
import axios from 'axios';
import { backendUrl } from '../../env.js';

/* 
{
    ADD_TO_WISH_LIST: 'ADD_TO_WISH_LIST',
    UPDATE_TO_WISH_LIST: 'UPDATE_TO_WISH_LIST',
    REMOVE_FROM_WISH_LIST: 'REMOVE_FROM_WISH_LIST',
    EMPTY_WISH_LIST: 'EMPTY_WISH_LIST',
    ACTION_WISH_LIST_SUCCESS: 'ACTION_WISH_LIST_SUCCESS',
    ACTION_WISH_LIST_FAILURE: 'ACTION_WISH_LIST_FAILURE',
    ACTION_WISH_LIST_REQUEST: 'ACTION_WISH_LIST_REQUEST',
    FETCH_WISH_LIST_ITEMS: 'FETCH_WISH_LIST_ITEMS',
    SET_WISH_LIST_ITEMS: 'SET_WISH_LIST_ITEMS',
}

 */
export const addToWL = (payload) => {
    return {
        type: WISH_LIST_ACTIONS.ADD_TO_WISH_LIST,
        payload
    }
}
export const updateWLItem = (payload) => {
    return {
        type: WISH_LIST_ACTIONS.UPDATE_TO_WISH_LIST,
        payload
    }
}
export const removeFromWL = (payload) => {
    return {
        type: WISH_LIST_ACTIONS.REMOVE_FROM_WISH_LIST,
        payload
    }
}
export const emptyWL = () => {
    return {
        type: WISH_LIST_ACTIONS.EMPTY_WISH_LIST
    }
}
const fetchWLItemsRequest = () => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_REQUEST
    }
}
//Failure for action
const fetchWLItemsFailure = (error) => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const fetchWLItemsSuccess = (wishList) => {
    return {
        type: WISH_LIST_ACTIONS.FETCH_WISH_LIST_ITEMS,
        payload: wishList
    }
}

export const fetchWLItems = (userId) => {
    return (dispatch) => {
        dispatch(fetchWLItemsRequest());
        return axios.get(`${backendUrl}/wishlist/${userId}`)
            .then(response => {
                const wishList = response.data;
                dispatch(fetchWLItemsSuccess(wishList));
            })
            .catch(error => dispatch(fetchWLItemsFailure(error)));
    };
}

const setCartItemsRequest = () => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_REQUEST
    }
}

//Failure for action
const setCartItemsFailure = (error) => {
    return {
        type: WISH_LIST_ACTIONS.ACTION_WISH_LIST_FAILURE,
        payload: error
    }
}

//success for fetching all Products
const setCartItemsSuccess = (wishList) => {
    return {
        type: WISH_LIST_ACTIONS.SET_WISH_LIST_ITEMS,
        payload: wishList
    }
}

export const getWishListItems = (userId) => {
    console.log("getting CartItems")
    const savedWishListItems = JSON.parse(localStorage.getItem('savedWishListItems')) === true;
    let wishList = [];
    if (savedWishListItems) {
        console.log("should find saved wishList items");
        wishList = JSON.parse(localStorage.getItem('wishList'));
    }
    return (dispatch) => {
        dispatch(setCartItemsRequest())
        if (!userId && savedWishListItems) {
            console.log("saving local wishList items to redux");
            dispatch(setCartItemsSuccess(wishList));
        }
        if (userId) {
            return axios.get(`${backendUrl}/wishList/${userId}`)
                .then(response => {
                    const wishList = response.data;
                    dispatch(setCartItemsSuccess(wishList));
                    localStorage.setItem('wishList', wishList);
                    localStorage.setItem('savedWishListItems', true);
                })
                .catch(error => {
                    console.log(error);
                    dispatch(setCartItemsFailure(error));
                });
        }
    };
}
