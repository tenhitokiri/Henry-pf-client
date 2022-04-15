import { combineReducers } from 'redux'
import productReducer from './Products/productReducer'
import cartReducer from './Cart/CartReducer'
import categoryReducer from './Categories/categoryReducer'

const allReducers = combineReducers({
    products: productReducer,
    cart: cartReducer,
    categories: categoryReducer
})

export default allReducers