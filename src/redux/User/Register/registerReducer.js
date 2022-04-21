import REGISTER_ACTIONS from './registerTypes';

const registerState = {
    name:'',
    email:'',
    loading:'',
    password:'', 
    error:''
}

const registerReducer = (state = registerState, action) => {
    const { type, payload } = action
    switch(type){
        case REGISTER_ACTIONS.REGISTER_CUSTOMER_INFO:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case REGISTER_ACTIONS.ACTION_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case REGISTER_ACTIONS.ADD_CUSTOMER_SUCCESS:
            {
                return {
                    ...state,
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    error:''
                }
            }

        default: return state
    }
}

export default registerReducer