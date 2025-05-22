import React, { useContext, useState } from 'react'
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import Headder from './Headder';
import Footer from './Footer';
//import { addToCart, clearCart } from '../../../Backend/controller/cart_controller';
const Cart = () => {
  const{cart, decreaseQty, addToCart, removeProduct, clearCart} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
    <Headder />
    {/* <div className='flex  mt-5 pt-5 mb-5 pb-5 '>
          <div className='w-full md:w-4/12'></div>
          <div className='w-full md:w-4/12'> */}
    <div className='mb-5 pb-5 p-5'>
      
    <h1 className="text-3xl font-semibold text-center mb-6">Your Cart </h1>
    
       {cart?.items?.map((i) => (
    <div key={i._id}>
           <div className="card card-side bg-base-100 shadow-xl" >
  <figure>
    <img className='w-50 object-cover t-lg '
      src={i.image}
      
      alt= {i.name}  style={{height:'200px',width:'200px'}}/>
  </figure>
  <div className="card-body">
  <h2 className="card-title">{i.name}</h2>
    <span>Rs {i.price}</span>
    

   
 


    <div className="card-actions">
      
      


    <div className="join">
      <button className='btn join-item btn-success font-bold text-xl 'onClick={()=>addToCart(i?.productId, i.name, i.price/i.qty , 1, i.image, "cartPage")} >+</button>
      <button className="btn join-item">{i.qty}</button>
      <button className='btn join-item btn-error font-bold text-xl ' onClick={()=>decreaseQty(i?.productId,1)}>-</button>
      </div>
      <div className='justify-end flex w-full'><button className='btn' onClick={()=> {if(confirm("Are you sure you want to remove product from cart")){removeProduct(i?.productId)}}}>Remove</button>
      
      
      </div>

    </div>
  </div>
</div> 
      <hr/>
    </div>
    
    ))}
  
</div>
    
  <div className='flex justify-center mb-5 pb-5'>

  {cart?.items?.length>0 && (
   
    <button className='btn' onClick={() => { 
      clearCart(); 
    }}>
      Clear Cart
    </button>
  )}


  {cart?.items?.length == 0 && (
    <>
    <div><h1 className='text-xl '> Your Cart is Empty Now. </h1></div>
    <div><h1 className='text-xl'>  Click<a href='/' className='text-blue-500 text-xl'> here</a> for continue shopping</h1></div>
    </>
  )}

  {cart?.items?.length >0 &&(
    <button className="btn btn-primary" onClick={()=> navigate('/address')}>Order Now</button>
  )}
  
  </div>
  



    
    <Footer/>
    </>
  
  )
}

export default Cart
