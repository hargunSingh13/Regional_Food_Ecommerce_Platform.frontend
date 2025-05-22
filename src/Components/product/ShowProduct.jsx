import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext';
import Headder from '../Headder';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "./PunjabiFood.png"
import img2 from "./NorthIndian.jpg"
import img3 from "./South Indian.jpg"
import img4 from "./Other.jpg"



//import { ToastContainer, toast } from 'react-toastify';


const ShowProduct = () => {
  const { products, filterData, addToCart, stateData, setFilterData} = useContext(AppContext);

  console.log("show products page===", products)
  const navigate = useNavigate()
  //console.log("State data==", stateData)

  useEffect(() => {
    setFilterData(products.filter((product) => product.bestSeller === 'Yes'))
  }, [products, setFilterData])

  const filterbyCategory = (cat) => {
    console.log(cat)
    // navigate('/')
    //window.location.href = window.location.href;

    setFilterData(
      // products.filter((product) => product.category.toLowerCase() === cat.toLowerCase())
      navigate(`/region/${cat}`)
    )
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const filterByOrigin = (ori) => {
    // navigate('/')
    //window.location.href = window.location.href;
    setFilterData(
      navigate(`/origin/${ori}`)
      // products.filter((product) => product.origin.toLowerCase() === ori.toLowerCase())
    )
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Headder />

      <div className='p-5'>
        <h1 className='text-center text-purple text-3xl font-bold mb-6 pb-5'>Explore our BESTSELLERS</h1>
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
                  <button className="btn btn-primary" onClick={() => addToCart(i._id, i.name, i.price, 1, i.image, "productPage")}>Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className='text-center p-5 text-3xl font-bold mb-5'>Explore via Region</h1>
        <div className="flex flex-wrap gap-7 justify-center">
          <div className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer" onClick={() => { filterbyCategory('Punjabi')}}>
            <figure className='relative overflow-hidden '>
              <img src={img1} alt="Punjabi Food" className='w-full h-64 object-cover' />
            </figure>
            <div className="card-body p-4 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="card-title text-xl font-semibold " >PUNJABI FOOD</h2>
            </div>
          </div>

          <div className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer" onClick={() => { filterbyCategory('North Indian') }}>
            <figure className='relative overflow-hidden '>
              <img src={img2} alt="NorthIndian Food" className='w-full h-64 object-cover' />
            </figure>
            <div className="card-body p-4 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="card-title text-xl font-semibold " >NORTH INDIAN FOOD</h2>
            </div>
          </div>

          <div className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer" onClick={() => { filterbyCategory('South Indian') }}>
            <figure className='relative overflow-hidden cursor-pointer'>
              <img src={img3} alt="SouthIndian Food" className='w-full h-64 object-cover' />
            </figure>
            <div className="card-body p-4 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="card-title text-xl font-semibold " >SOUTH INDIAN FOOD</h2>
            </div>
          </div>

          <div className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer" onClick={() => { filterbyCategory('Other') }}>
            <figure className='relative overflow-hidden '>
              <img src={img4} alt="Other Food" className='w-full h-64 object-cover' />
            </figure>
            <div className="card-body p-4 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="card-title text-xl font-semibold " >OTHER INDIAN STATES</h2>
            </div>
          </div>

        </div>

        <h1 className='text-center mt-5 p-5 text-3xl font-bold mb-5'>Explore via State</h1>

        <div className="flex flex-wrap gap-7 justify-center">
          {stateData?.map((i) => (
            <div key={i._id} className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer" onClick={() => { filterByOrigin(i.state) }}>
              <figure className='relative overflow-hidden '>

                <img src={i.image} alt={i.name} className='w-full h-48 object-cover' />

              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-semibold">{i.state.toUpperCase()}</h2>

              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  )
}

export default ShowProduct
