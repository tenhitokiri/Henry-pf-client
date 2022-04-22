import LOGIN_ACTIONS from './loginTypes';

const loginState = {
    loading:'',
    email:'',
    password:'', 
    token:'',
    error:''
}

const loginReducer = (state = loginState, action) => {
    const { type, payload } = action
    switch(type){
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
                return {
                    ...state,
                    email: payload.email,
                    token:payload.token,
                    error:''
                }
            }

        default: return state
    }
}

export default loginReducer