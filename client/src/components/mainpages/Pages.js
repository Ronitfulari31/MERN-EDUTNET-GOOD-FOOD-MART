import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './cart/Cart'
import Login from './login/Login'
import Register from './login/Register'
import Product from './products/Product'


const Pages=()=> {
  return (
   <Routes>
    <Route path='/' element={<Product/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/register' element={<Register/>}/>
    
   </Routes>
  )
}

export default Pages
