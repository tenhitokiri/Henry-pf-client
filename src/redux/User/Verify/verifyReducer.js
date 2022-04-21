import VERIFY_ACTIONS from './verifyTypes';

const verifyState = {
    loading:'',
    token:'',
    verified:'', 
    error:''
}

const verifyReducer = (state = verifyState, action) => {
    const { type, payload } = action
    switch(type){
        case VERIFY_ACTIONS.ACTION_VERIFY_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case VERIFY_ACTIONS.ACTION_VERIFY_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case VERIFY_ACTIONS.FETCH_TOKEN_SUCCESS:
            {
                return {
                    ...state,
                    loadin:false,
                    token:payload,
                    verified:true,
                    error:''
                }
            }

        default: return state
    }
}

export default verifyReducer