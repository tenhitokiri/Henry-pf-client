import { combineReducers } from 'redux'
import productReducer from './Products/productReducer'
import CartReducer from './Cart/CartReducer'

const allReducers = combineReducers({
    products: productReducer,
    cart: CartReducer
})

export default allReducers