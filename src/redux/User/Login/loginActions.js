import LOGIN_ACTIONS from './loginTypes';
import axios from 'axios';

import { backendUrl } from '../../../env';


const actionLoginRequest = () => {
    return {
        type: LOGIN_ACTIONS.LOGIN_CUSTOMER_INFO
    }
}

const actionLoginSuccess = (Customers) => {
    return {
        type: LOGIN_ACTIONS.ACTION_LOGIN_SUCCESS,
        payload: Customers
    }
}

const actionLoginFailure = (error) => {
    return {
        type: LOGIN_ACTIONS.ACTION_LOGIN_FAILURE,
        payload: error
    }
}
// ------------------------------------
export const addLOGIN = (Customer) => {
    return (dispatch) => {
        dispatch(actionLoginRequest())
        let api = backendUrl + 'auth/register'
        console.log(`Login a customer: ${api}`)
        axios.post(api, Customer)
            .then(response => {
                console.log(response)
                dispatch(actionLoginSuccess(response))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionLoginFailure(msg))
            })
    }
}
//--------------------------------------
export const signIn = (Customers) => {
    return dispatch => {
        dispatch(actionLoginRequest())
        let api = backendUrl + 'auth/login'
        axios.post(api, Customers)
            .then(response => {
                console.log(response, "login success?")
                dispatch(actionLoginSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                const msg = error.message
                dispatch(actionLoginFailure(msg))
            })
    }
}

export const getUserCredentials = () => {
    return async (dispatch) => {
        const credentials = JSON.parse(localStorage.getItem("userCredentials"));
        dispatch({
            type: LOGIN_ACTIONS.ACTION_GET_CREDENTIALS,
            payload: credentials,
        });
    };
};

export const loginGoogle = (userData) => async (dispatch) => {
    const data = await axios.post("/user/loginGoogle", userData);
    return dispatch({
        type: LOGIN_ACTIONS.ACTION_LOGIN_GOOGLE,
        payload: data,
    });
};

export const loginFromLocalStorage = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        return dispatch(actionLoginSuccess(token))

    }
}