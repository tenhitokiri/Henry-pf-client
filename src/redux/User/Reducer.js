import { combineReducers } from 'redux'
import loginReducer from './Login/loginReducer'
import registerReducer from './Register/registerReducer'
import verifyReducer from './Verify/verifyReducer'


const logginsReducers = combineReducers({
    loggin: loginReducer,
    register: registerReducer,
    verify: verifyReducer
})

export default logginsReducers