import VERIFY_ACTIONS from './verifyTypes';

const verifyState = {
    loading: "",
    token: "",
    verified: "",
    permission: 'denegade',
    error: ""
}

const verifyReducer = (state = verifyState, action) => {
    const { type, payload } = action
    switch (type) {
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
                    loading: false,
                    token: payload,
                    verified: true,
                    permission: 'aprobbed',
                    error: ''
                }
            }
        case VERIFY_ACTIONS.PERMISSION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    error: ''

                }
            }

        case VERIFY_ACTIONS.PERMISSION_FAILURE:
            {
                return {
                    ...state,
                    loading: false,
                    error: payload,
                    permission: 'denegade'
                }
            }
        case VERIFY_ACTIONS.PERMISSION_SUCCES:
            {
                return {
                    ...state,
                    loading: false,
                    error: '',
                    permission: 'aprobbed'
                }
            }
        default: return state
    }
}

export default verifyReducer