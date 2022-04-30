import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import ProductGetAll from './components/Products/ProductGetAll';
import ProductForm from './components/Products/ProductForm';
import ProductDetail from './components/Products/ProductDetail';
import ProductSearch from './components/Products/ProductSearch';
import AddCategory from './components/Admin/Categories/AddCategogory'
import Route404 from './components/NotFound/Route404';
import Nav from './components/Nav/Nav';
import Cart from './components/Cart/Cart';
import AddProductDone from './components/Products/AddProductDone';
import Register from './components/Authentication/Register/Register'
import Login from './components/Authentication/Login/Login'
import Verify from './components/Authentication/Verify/Verify'
import PasswordRecover from './components/Authentication/PasswordRecover'
import NeedLogginOrRegister from './components/Authentication/NeedLogginOrRegister'
import './App.css';
import Panels from './components/User/Panels/Panels';
import { fetchDetailCategories, fetchProducts, getCartItems, fetchWLItems, postCartToDB } from './redux';
import WishList from './components/WishList/WishList';
import { useDispatch, useSelector } from 'react-redux';
import { permission, loginFromLocalStorage } from './redux'
//import jwt from 'jwt-decode';
import MPConf from './components/MercadoPago/MPConf';


// >>>>>>> ecae7777926a998a88797d8038a14395528a281d

function App() {

  const dispatch = useDispatch()
  const user_id = useSelector(state => state.loggin.loggin.id)
  const cartList = useSelector(state => state.cart.cartItems)
  const savedCart = useSelector(state => state.cart.savedOnDB)

  useEffect(() => {
    dispatch(fetchDetailCategories())
    dispatch(fetchProducts())

    try {
      const token = window.localStorage.getItem('token')
      dispatch(permission(token))
      dispatch(loginFromLocalStorage(token))

    } catch (e) { return console.error }

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user_id) {
      dispatch(getCartItems(user_id))
      dispatch(fetchWLItems(user_id))
    }
    else {
      dispatch(getCartItems())
    }
  }, [user_id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user_id) {
      console.log(user_id, '<user cart')
      dispatch(postCartToDB(cartList, user_id))
    }
  }, [cartList]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <div className="wrapperMain">
        <div className="stickyHeader">
          <Header />
          <Nav />
        </div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/products' element={<ProductGetAll />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/add-product/done' element={<AddProductDone />} />
          <Route path='/find-product' element={<ProductSearch />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/admin/add-category' element={<AddCategory />} />
          <Route path='/panels' element={<Panels />} />
          <Route path='/need-authenticated' element={<NeedLogginOrRegister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/passwordRecover' element={<PasswordRecover />} />
          <Route path='/verify/:id' element={<Verify />} />
          <Route path="/mp_confirmation" element={<MPConf />} />
          <Route path="*" element={<Route404 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
