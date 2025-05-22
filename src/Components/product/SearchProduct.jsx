import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { Link, useParams } from 'react-router-dom'
import Headder from '../Headder'
import Footer from '../Footer'



const SearchProduct = () => {
  const {products, addToCart} = useContext(AppContext)
  const [searchProduct, setSearchProduct] = useState([])
  const {term} = useParams()
  useEffect(()=>{
    setSearchProduct(
      products.filter(
        (i)=> i?.name?.toLowerCase().includes(term.toLowerCase())
      )
    )
  },[term, products])
  console.log(searchProduct)
  if(!searchProduct){
    return <div>Loading....</div>
  }
  return (
    <>
    <Headder/>
    <div>
        <div className="flex flex-wrap gap-7 justify-center mb-5">
          {searchProduct?.map((i) => (
            <div key={i._id} className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
              <figure className='relative overflow-hidden cursor-pointer'>
                <Link to={`/product/${i._id}`}>
                  <img src={i.image} alt={i.name} className='w-full h-48 object-cover' />
                </Link>
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-semibold">{i.name}</h2>
                <p className='text-gray-600 text-sm'>{i.description}</p>
                <div className=" flex justify-between items-center mt-3 card-actions justify-end">
                  <span className='text-lg font-bold text-green-600'>₹{i.price}/{i.pricePerUnit}</span>
                  <button className="btn btn-primary" onClick={() => addToCart(i._id, i.name, i.price, 1, i.image)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

    </div>
    <Footer/>
    </>
  )
}

export default SearchProduct
