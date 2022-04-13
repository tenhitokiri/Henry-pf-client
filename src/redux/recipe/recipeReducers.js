import RECIPE_ACTIONS from './recipeTypes'

const recipeState = {
    recipes: [],
    foundRecipes: [],
    loading: "",
    error: "",
    numberOfRecipes: 0,
    numberOfFoundRecipes: 0
}

const recipeReducer = (state = recipeState, action) => {
    const { type, payload } = action
    switch (type) {
        case RECIPE_ACTIONS.ACTION_RECIPES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case RECIPE_ACTIONS.ACTION_RECIPES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RECIPE_ACTIONS.CLEAR_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                foundRecipes: [],
                numberOfFoundRecipes: 0
            }
        case RECIPE_ACTIONS.FETCH_ALL_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: payload,
                numberOfRecipes: payload.length,
                error: ''
            }
        case RECIPE_ACTIONS.FETCH_A_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                foundRecipes: payload,
                numberOfFoundRecipes: payload.length,
                error: ''
            }
        case RECIPE_ACTIONS.FETCH_RECIPE_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                foundRecipes: payload,
                numberOfFoundRecipes: payload.length,
                error: ''
            }
        case RECIPE_ACTIONS.ADD_RECIPE_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    recipes: [...state.recipes, payload],
                    numberOfRecipes: state.numberOfRecipes + 1,
                    error: ''
                }
            }
        case RECIPE_ACTIONS.UPDATE_RECIPE_SUCCESS:
            {
                const updatedRecipes = state.recipes.map(recipe => {
                    if (recipe.id === payload.id) {
                        return payload
                    }
                    return recipe
                }
                )
                return {
                    ...state,
                    loading: false,
                    recipes: updatedRecipes,
                    error: ''

                }
            }
        case RECIPE_ACTIONS.DELETE_RECIPE_SUCCESS:
            {
                const updatedRecipes = state.recipes.filter(recipe => recipe.id !== payload.id)
                return {
                    ...state,
                    loading: false,
                    recipes: updatedRecipes,
                    numberOfRecipes: state.numberOfRecipes - 1,
                    error: ''

                }
            }
        default: return state
    }
}

export default recipeReducer