import { combineReducers } from 'redux'
import recipeReducer from './recipe/recipeReducers'
//import dietReducer from './diet/dietReducers'

const allReducers = combineReducers({
    recipe: recipeReducer,
    //    diet: dietReducer
})

export default allReducers