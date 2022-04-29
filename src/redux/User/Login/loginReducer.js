import LOGIN_ACTIONS from './loginTypes';
import jwt from 'jwt-decode';


const loginState = {
    loading: '',
    name: '',
    id: '',
    email: '',
    isAdmin: '',
    isProvider: '',
    token: '',
    error: '',
    userGoogleData: [],
    userCredentials: [],
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
                // console.log(payload, "login success")
                // console.log(data, "data")
                window.localStorage.setItem('token', payload)
                return {
                    ...state,
                    loading: false,
                    name: data.name,
                    id: data.user_id,
                    token: payload,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    isProvider: data.isProvider,
                    error: false
                }
            }
        case LOGIN_ACTIONS.ACTION_LOGIN_GOOGLE:
            const info = payload.data
            return {
                ...state,
                loading:false,
                name: info.name,
                id:info.user_id,
                email: info.email,
                isAdmin: info.admin,
                isProvider: info.provider,
                userGoogleData: [...state.userGoogleData, payload]

            }
        case LOGIN_ACTIONS.ACTION_GET_CREDENTIALS:
            return {
                ...state,
                userCredentials: payload
            }
        default: return state
    }
}

export default loginReducer