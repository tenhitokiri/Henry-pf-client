import REGISTER_ACTIONS from './registerTypes';
import axios from 'axios';
import { backendUrl } from '../../../env';


const actionCustomerRequest = () => {
    return {
        type: REGISTER_ACTIONS.REGISTER_CUSTOMER_INFO
    }
}

const addCustomerSuccess = (Customers) => {
    return {
        type: REGISTER_ACTIONS.ADD_CUSTOMER_SUCCESS,
        payload: Customers
    }
}

const actionCustomerFailure = (error) => {
    return {
        type: REGISTER_ACTIONS.ACTION_CUSTOMER_FAILURE,
        payload: error
    }
}

export const addCUSTOMER = (Customer) => {
    return (dispatch) => {
        dispatch(actionCustomerRequest())
        let api = backendUrl + 'auth/register'
        console.log(`Signing up a customer: ${api}`)
        axios.post(api, Customer)
            .then(response => {
                dispatch(addCustomerSuccess(Customer.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionCustomerFailure(msg))
            })
    }
}