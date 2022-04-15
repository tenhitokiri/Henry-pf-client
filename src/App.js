import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import ProductGetAll from './components/Products/ProductGetAll';
import ProductForm from './components/Products/ProductForm';
import ProductDetail from './components/Products/ProductDetail';
import ProductSearch from './components/Products/ProductSearch';
import Route404 from './components/NotFound/Route404';
import Nav from './components/Nav/Nav';
import { fetchProducts } from './redux/Products/productActions'
import { useDispatch } from 'react-redux'
import Cart from './components/Cart/Cart';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
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
        <Route path='/find-product' element={<ProductSearch />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="*" element={<Route404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
