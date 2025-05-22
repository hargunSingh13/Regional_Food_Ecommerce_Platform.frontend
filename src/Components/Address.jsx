import React, { useContext, useState } from 'react'
import Headder from './Headder'
import Footer from './Footer'
import AppContext from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'
const Address = () => {
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [contact, setContact] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [country, setCountry] = useState("");
      const [pincode, setPincode] = useState("");
      const [address, setAddress] = useState("");

      const {addAddress, userAddress} = useContext(AppContext);
      const fullName = firstName+" "+lastName;
      const navigate = useNavigate();

      const formHandler = async(e)=>{
        e.preventDefault();

        if(email==""){
          console.log(email)
          alert("All field required")
        }
      
      try{  
        const res = await addAddress(fullName, email, address, city, state, country, pincode ,contact)
        alert("Address added successfully", res)
        navigate('/checkout');
        window.location.reload()
        
      }
      catch(error){
          console.error("Product error", error)
      }
      }
  return (
    
      <>
      <Headder/>
      <div className='flex '>
        <div className='w-full md:w-3/12'></div>
        <div className='w-full md:w-6/12   '>

        
        <div className='border mt-5 p-5 shadow-xl br rounded-lg'>
        <form onSubmit={formHandler}>
        <center><h1 className='text-3xl mb-5 font-semibold'> Shipping Address</h1></center>
        <div className='flex mb-4'>
        <div className='w-full md:w-2/12  p-3 pl-5 text-lg font-semibold'> First Name:</div>
        <div className='w-full md:w-4/12 '> <input className="input input-bordered w-full max-w-xs"
         value={firstName} onChange={(e)=>setFirstName(e.target.value)} required/></div>
        <div className='w-full md:w-2/12  p-3 pl-5 text-lg font-semibold'> Last Name:</div>
        <div className='w-full md:w-4/12 '> <input className="input input-bordered w-full max-w-xs"value={lastName} onChange={(e)=>setLastName(e.target.value)} /></div>
        </div>

        <div className='flex mb-4'>
        <div className='w-full md:w-2/12  p-3 pl-5 text-md font-semibold'> Email Address:</div>
        <div className='w-full md:w-4/12 '> <input type='email' className="input input-bordered w-full max-w-xs"value={email} onChange={(e)=>setEmail(e.target.value)} required/></div>
        <div className='w-full md:w-2/12  p-3 pl-5 text-lg font-semibold'> Contact No.</div>
        <div className='w-full md:w-4/12 '> <input type='tel' className="input input-bordered w-full max-w-xs"value={contact} onChange={(e)=>setContact(e.target.value)} required/></div>
        </div>

        <div className='flex mb-4'>
        <div className='w-full md:w-2/12  p-3 pl-5 text-md font-semibold'>City:</div>
        <div className='w-full md:w-4/12 '> <input type='text' className="input input-bordered w-full max-w-xs"value={city} onChange={(e)=>setCity(e.target.value)} required/></div>
        <div className='w-full md:w-2/12  p-3 pl-5 text-lg font-semibold'> State:</div>
        <div className='w-full md:w-4/12 '> <input type='text' className="input input-bordered w-full max-w-xs"value={state} onChange={(e)=>setState(e.target.value)} required/></div>
        </div>

        <div className='flex mb-4'>
        <div className='w-full md:w-2/12  p-3 pl-5 text-md font-semibold'> Country:</div>
        <div className='w-full md:w-4/12 '> <input type='text' className="input input-bordered w-full max-w-xs"value={country} onChange={(e)=>setCountry(e.target.value)} required/></div>
        <div className='w-full md:w-2/12  p-3 pl-5 text-lg font-semibold'> Pin Code:</div>
        <div className='w-full md:w-4/12 '> <input type='number' className="input input-bordered w-full max-w-xs"value={pincode} onChange={(e)=>setPincode(e.target.value)} required /></div>
        </div>

        <div className='flex'>
          <div className='w-full md:w-2/12  p-3 pl-5 text-lg font-semibold'>Address:</div>
          <div className='w-full md:w-10/12 '><input className="input input-bordered w-full "value={address} onChange={(e)=>setAddress(e.target.value)} required/></div>
        </div>

        <div >
        <center><button className='btn btn-primary mt-5 w-96 font-bold' type='submit' >Submit</button></center>
        </div>

        </form>

        {userAddress && (
        <div >
        <center><button className='btn bg-yellow-500 mt-5 w-96 font-bold' onClick={()=>navigate('/checkout')}>Use Old Address</button></center>
        </div>
        )}
        
        </div>
        </div >
        <div className='w-full md:w-3/12'></div>
      </div>
      <Footer/>
      </>
      
    
  )
}

export default Address
