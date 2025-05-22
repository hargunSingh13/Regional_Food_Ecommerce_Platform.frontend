import React, { useContext, useEffect, useState } from 'react'

import Headder from './Headder';
import Footer from './Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../Context/AppContext';

const Category = () => {
        const { products, filterData, addToCart, setFilterData } = useContext(AppContext);
        const {mod} = useParams();
         console.log("show products page===", products)
        //const navigate = useNavigate()
      
        useEffect(() => {
            if(mod && products.length>0){
          setFilterData(products.filter((product) => product.mode.toLowerCase() === mod.toLowerCase()))
            }
        }, [mod, products, setFilterData])

      
  return (
    <>
    <Headder/>
    <h1 className='text-center mt-5 text-purple text-3xl font-bold mb-6 pb-5'>{`Explore ${mod.toUpperCase()} FOOD`}</h1>
            <div className="flex flex-wrap gap-7 justify-center mb-5">
              {filterData?.map((i) => (
                <div key={i._id} className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                  <figure className='relative overflow-hidden cursor-pointer'>
                    <Link to={`/product/${i._id}`} >
                      <img src={i.image} alt={i.name} className='w-full h-48 object-cover' />
                    </Link>
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-xl font-semibold">{i.name + ` (${i.origin})`}</h2>
                    <p className='text-gray-600 text-sm'>{i.description}</p>
                    <div className=" flex justify-between items-center mt-3 card-actions justify-end">
                      <span className='text-lg font-bold text-green-600'>₹{i.price}/{i.pricePerUnit}</span>
                      <button className="btn btn-primary" onClick={() => addToCart(i._id, i.name, i.price, 1, i.image,"productPage")}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Footer/>
    </>
  )
}

export default Category;
