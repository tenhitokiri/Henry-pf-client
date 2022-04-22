import { combineReducers } from 'redux'
import productReducer from './Products/productReducer'
import cartReducer from './Cart/CartReducer'
import categoryReducer from './Categories/categoryReducer'
import wishListReducer from './WishList/wLReducer'
import logginsReducers from './User/Reducer'

const allReducers = combineReducers({
    products: productReducer,
    cart: cartReducer,
    categories: categoryReducer,
    wishList: wishListReducer,
    loggin: logginsReducers
})

export default allReducers