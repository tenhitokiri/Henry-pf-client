import CATEGORY_ACTIONS from './categoryTypes'

const categoryState = {
    categories: []
}

const categoryReducer = (state = categoryState, action) => {
    const { type, payload } = action
    switch (type) {
        case CATEGORY_ACTIONS.ACTION_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case CATEGORY_ACTIONS.ACTION_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: payload,
                numberOfCategories: payload.length,
                error: ''
            }
        case CATEGORY_ACTIONS.FETCH_CATEGORIES_DETAIL:
            {
                return {
                    ...state,
                    loading: false,
                    categories: payload,
                    numberOfCategories: payload.length,
                    error: ''
                }
            }
        default: return state
    }
}

export default categoryReducer