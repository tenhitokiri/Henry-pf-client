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
// <<<<<<< HEAD
import Panels from './components/User/Panels/Panels';
// =======
import { fetchDetailCategories, fetchProducts, getCartItems } from './redux';
import WishList from './components/WishList/WishList';
import { useDispatch } from 'react-redux';
import { permission } from './redux'

// >>>>>>> ecae7777926a998a88797d8038a14395528a281d

function App() {
  const token = window.localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(permission(token))
    dispatch(fetchDetailCategories())
    dispatch(fetchProducts())
    dispatch(getCartItems())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/products' element={<ProductGetAll />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/add-product' element={<ProductForm />} />
        <Route path='/add-produc/done' element={<AddProductDone />} />
        <Route path='/find-product' element={<ProductSearch />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/admin/add-category' element={<AddCategory />} />
        <Route path='/panels' element={<Panels />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/passwordRecover' element={<PasswordRecover />} />
        <Route path='/verify/:id' element={<Verify />} />
        <Route path="*" element={<Route404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
