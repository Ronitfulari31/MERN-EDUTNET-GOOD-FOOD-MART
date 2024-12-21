import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const Product = () => {

    const state = useContext(GlobalState)
    //const [products] = state.productsAPI.products

    console.log(state)
  return (
    <div className='products'>
      
         PRODUCTS WILL SHOWN UP SOON!!
      
    </div>
  )
}

export default Product
