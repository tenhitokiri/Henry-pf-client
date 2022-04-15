import { combineReducers } from 'redux'
import productReducer from './Products/productReducer'
import CartReducer from './Cart/CartReducer'
import categoryReducer from './Categories/categoryReducer'

const allReducers = combineReducers({
    products: productReducer,
    cart: CartReducer,
    categories: categoryReducer
})

export default allReducers