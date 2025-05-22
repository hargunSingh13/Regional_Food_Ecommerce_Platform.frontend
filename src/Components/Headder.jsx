import React, { useContext, useState,useEffect } from 'react'
import AppContext from '../Context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const Headder = () => {
  const {isAuthenticated, products, setFilterData, Logoutuser, cart, sum, setHeading} = useContext(AppContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("")
  

  // useEffect(() => {
  //   const savedMode = localStorage.getItem('selectedMode');
  //   if (savedMode) {
  //     setFilterData(
  //       products.filter(
  //         (product) => product.mode.toLowerCase() === savedMode.toLowerCase()
  //       )
  //     );
  //     setHeading(`Explore ${savedMode.toUpperCase()} FOOD`);
  //   }
  // }, [products])

  const formHandler = (e)=> {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("")
  }
  

  const filterbyMode = (mod)=>{
    console.log("mode",mod)
    //window.location.reload();
    // navigate('/')
    // localStorage.setItem('selectedMode', mod);
    setFilterData(
      // products.filter((product)=> product.mode.toLowerCase() === mod.toLowerCase())
      navigate(`/category/${mod}`)
    )

    
  }

  const filterByBestSeller = ()=>{
    

    navigate('/')
    setFilterData(
      products.filter((product)=> product.bestSeller === "Yes")
    )
    
  }
  return (
    <div className='w-full'>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" onClick={()=> {filterByBestSeller()}}>All</a>
    <a className="btn btn-ghost text-xl" onClick={()=>{filterbyMode('Sweet')}}>SWEET</a>
    <a className="btn btn-ghost text-xl" onClick={()=>{filterbyMode("Spicy")}}>SPICY</a>
    <a className="btn btn-ghost text-xl" onClick={()=>{filterbyMode("Snacks")}}>EVENING SNACKS</a>
    <a className="btn btn-ghost text-xl" onClick={()=>{filterbyMode("Others")}}>OTHER</a>
  </div>

  {/* <nav className="bg-gradient-to-r from-orange-400 to-red-500 shadow-md"> */}
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
    <div className="flex items-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r tracking-wider italic from-yellow-300 via-orange-500 to-red-600 text-transparent bg-clip-text">
        Flavors of India
      </h1>
    </div>
  </div>





  

  <div className="flex-none">
    <form onSubmit={formHandler}>
  <div className="form-control ">
      <input type="text" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} placeholder="Search" className="input input-bordered w-24 md:w-auto "  />
    </div>
    </form>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item bg-warning">  {cart?.items?.length} </span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.items?.length} Items</span>
          
            
              
          <span className="text-blue-700">Subtotal: Rs{sum}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={
              ()=>{
                navigate('/cart')
              }
            }>View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {!isAuthenticated &&(
        <>
       <li>
          <a className="justify-between" href='/log'>
            Login
          </a>
        </li>
        <div className='flex'>
        <p>New customer?  &nbsp;  &nbsp;  &nbsp;</p> <a class=' decoration-blue-800 underline '  href="/reg"><p className='text-blue-500'>Register</p></a>
        </div>
        </>
       )}
       
       {isAuthenticated &&(
        <>
        <li>
          <a onClick={()=> navigate('/userOrders')}>All Orders</a>
        </li>
        <li>
          <a onClick={()=>{Logoutuser();
            navigate('/log');
          }}>Logout</a>
        </li>
        </>
       )}
        
       
        
      </ul>
    
    </div>
  </div>
</div>


    </div>
  )
}

export default Headder
