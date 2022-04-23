import VERIFY_ACTIONS from './verifyTypes'
import axios from 'axios';
import { backendUrl } from '../../../env.js';

//Request for action
const actionVerifyRequest = () => {
    return {
        type: VERIFY_ACTIONS.ACTION_VERIFY_REQUEST
    }
}

//Failure for action
const actionVerifyFailure = (error) => {
    return {
        type: VERIFY_ACTIONS.ACTION_VERIFY_FAILURE,
        payload: error
    }
}
//success for fetching the token
const fetchTokenSuccess = (Token) => {
    return {
        type: VERIFY_ACTIONS.FETCH_TOKEN_SUCCESS,
        payload: Token
    }
}

//succes permission
const permissionRequest = () => {
    return {
        type: VERIFY_ACTIONS.PERMISSION_REQUEST
    }
}

const permissionFailure = (e) => {
    return {
        type: VERIFY_ACTIONS.ACTION_VERIFY_FAILURE,
        payload: e
    }
}

const permissionSucces = (payload) => {
    return {
        type: VERIFY_ACTIONS.PERMISSION_SUCCES,
        payload
    }
}

//activar cuenta
export const fetchToken = (tkn) => {
    return dispatch => {
        //dispatch(actionVerifyRequest())
        let api = backendUrl + 'auth/verify/' + tkn
        console.log(`fetchToken: ${api}`)
        axios.get(api)
            .then(response => {
                const tken = response.data
                dispatch(fetchTokenSuccess(tken))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionVerifyFailure(msg))
            })
    }
}

//permissions

export const permission = (token) => {
    return dispatch => {
        dispatch(permissionRequest())
        let api = backendUrl + 'auth/is-verify'
        axios.get(api, {
            headers: {
                'token': token
            }
        })
            .then(response => {
                console.log(response.data, '---------------------')
                dispatch(permissionSucces(response.data))
            })
            .catch(error => {
                const msg = error.message
                dispatch(permissionFailure(msg))
            })
    }
}

