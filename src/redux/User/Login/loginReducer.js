import LOGIN_ACTIONS from './loginTypes';
import jwt from 'jwt-decode';


const loginState = {
    loading: '',
    name: '',
    email: '',
    isAdmin: '',
    isProvider: '',
    token: '',
    error: ''
}


const loginReducer = (state = loginState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN_ACTIONS.LOGIN_CUSTOMER_INFO:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case LOGIN_ACTIONS.ACTION_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case LOGIN_ACTIONS.ACTION_LOGIN_SUCCESS:
            {
                const data = jwt(payload)
                window.localStorage.setItem('token', payload)
                return {
                    ...state,
                    loading: false,
                    name: data.name,
                    token: payload,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    isProvider: data.isProvider,
                    error: false
                }
            }
        default: return state
    }
}

export default loginReducer