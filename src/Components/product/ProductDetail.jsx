import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';
import Headder from '../Headder';
import AppContext from '../../Context/AppContext';
import Footer from '../Footer';


const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const {id} = useParams();
  const url = "http://localhost:3000/api"
  const {addToCart} = useContext(AppContext);

  useEffect(()=>{
    const fetchProduct = async()=>{
      const api =await axios.get(`${url}/product/${id}`,{
        headers:{
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api)
      console.log(api.data)
      console.log(api.data.product)
      setProduct(api.data.product)
      window.scrollTo({top:0, behavior: "smooth"});
    };
    fetchProduct();
  },[id]);
  return (
    <>
    <Headder />

    <div className='flex mt-3'>
      <div className='w-full md:w-2/12'></div>
      <div className='w-full md:w-5/12  shadow-xl rounded-l-3xl border '>
        <h1 className='text-4xl font-semibold flex justify-center mb-4'>{product.name}</h1>
        <img src={product.image} alt={product.name} className=' w-full h-96 object-cover flex justify-center mb-5'/>
        <div className=" flex   mt-3 mb-3  justify-end">
        <span className='text-2xl font-bold text-green-600'>₹{product.price}/{product.pricePerUnit}</span>
        
        </div>
      </div>
      <div className='w-full md:w-3/12  shadow-xl justify-center rounded-r-3xl border'>
      <h1 className='text-4xl font-semibold flex justify-center mb-4'>Details</h1>
      <h1 className='text-2xl ml-5 pl-3  mb-2'><span className='font-medium'>Name: &nbsp;</span> {product.name}</h1>
      <h1 className='text-2xl ml-5 pl-3  mb-2'><span className='font-medium'>Origin:&nbsp;</span>{product.origin}</h1>
      <h1 className='text-2xl ml-5 pl-3  mb-2'><span className='font-medium'>Category:&nbsp;</span> {product.category}</h1>
      <h1 className='text-2xl ml-5 pl-3  mb-2'><span className='font-medium'>PricePerUnit:&nbsp;</span> {product.pricePerUnit}</h1>
      <h1 className='text-2xl ml-5 pl-3  mb-2'><span className='font-medium'>Mode:&nbsp;</span> {product.mode}</h1>
      <h1 className='text-2xl ml-5 pl-3  mb-2'><span className='font-medium'>Description: &nbsp;</span>{product.description}</h1>
      <button className="btn btn-primary w-5/6 ml-7 mt-5  " onClick={() => addToCart(product._id, product.name, product.price, 1, product.image,"productPage")}>Add To Cart</button>
      </div>
      <div className='w-full md:w-2/12'></div>

    </div>

    <RelatedProduct mode={product?.mode}/>
    <Footer />
      </>
  )
}

export default ProductDetail
