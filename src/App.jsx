import { Route, Routes } from 'react-router-dom'

import React from 'react'
import Register from './Components/user/Register'
import Login from './Components/user/Login'
import ShowProduct from './Components/product/ShowProduct'

import AddProduct from './Components/AddProduct'
import Adminshowproduct from './Components/Adminshowproduct'

import AdminEditProduct from './Components/AdminEditProduct'
import ProductDetail from './Components/product/ProductDetail'
import { ToastContainer } from 'react-toastify';
import Profile from './Components/user/Profile'
import Cart from './Components/Cart'
import Address from './Components/Address'
import Checkout from './Components/Checkout'
import AdminAddState from './Components/AdminAddState'
import Upiqr from './Components/Upiqr'
import AdminAllOrders from './Components/AdminAllOrders'
import SearchProduct from './Components/product/SearchProduct'
import Success from './Components/Success'
import Failure from './Components/Failure'
import AdminSecurity from './Components/AdminSecurity'
import UserOrders from './Components/UserOrders'
import Category from './Components/Category'
import ShowReggion from './Components/ShowReggion'
import ShowOrigin from './Components/ShowOrigin'




const App = () => {
  const arole = localStorage.getItem('role');
  console.log("arole", arole)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/reg' element={<Register />}></Route>
        <Route path='/log' element={<Login />}></Route>
        <Route path='/' element={<ShowProduct />}></Route>

        

        <Route path='/product/:id' element={<ProductDetail />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/address' element={<Address />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/upiqr/:p' element={<Upiqr />}></Route>
        
        <Route path='/product/search/:term' element={<SearchProduct />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='/failure' element={<Failure />}></Route>
        <Route path='/adminSec' element={<AdminSecurity />}></Route>
        <Route path='/userOrders' element={<UserOrders />}></Route>
        <Route path='/category/:mod' element={<Category />}></Route>
        <Route path='/region/:cat' element={<ShowReggion/>}></Route>
        <Route path='/origin/:ori' element={<ShowOrigin/>}></Route>
        {arole === "Admin" && (
          <>
            <Route path='/addproduct' element={<AddProduct />}></Route>
            <Route path='/showadmin' element={<Adminshowproduct />}></Route>
            <Route path='/editproduct/:id' element={<AdminEditProduct />}></Route>
            <Route path='/allorders' element={<AdminAllOrders />}></Route>
            <Route path='/addstate' element={<AdminAddState />}></Route>
          </>
        )}

      </Routes>
    </>
  )
}

export default App
