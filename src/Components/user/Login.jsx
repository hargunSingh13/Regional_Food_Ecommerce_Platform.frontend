import React, { useContext, useState } from 'react'
import Headder from '../Headder'
import Footer from '../Footer'
import AppContext from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {Login} = useContext(AppContext);
  const navigate= useNavigate()
  const formHandler = async(e)=> {
    e.preventDefault();
    // console.log({name,email,password}) 

    try{
        const result = await Login(email,password)
        //alert("user login successfully", result)
        console.log(result.success)
        if (result.success){
          navigate('/')
          //window.location.reload()
          
        }
        else{
          // alert(result.msg)
          navigate('/log')
        }
        
    }
    catch(error){
        console.error("Registration error", error)
    }
    
}
  return (
    <>
    <Headder/>
   
    <div className='flex mt-5 pt-5 mb-5 pb-5'>
      <div className='w-full md:4/12'></div>
      <div className='w-full md:4/12'>
      <form onSubmit={formHandler} className='border mt-5 p-5 shadow-xl br rounded-lg'>
      <center><h1 className='text-3xl mb-5 font-semibold'> Login</h1></center>
      <label className="input input-bordered flex items-center gap-2 mt-5">
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input value = {email} onChange={(e)=>setEmail(e.target.value)} type="email" className="grow" placeholder="Email" required />
</label>

<label className="input input-bordered flex items-center gap-2 mt-5">
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="grow" placeholder="Password" required />
</label>
<center>
<button type='submit' className='btn btn-primary mt-5 w-48'>Submit</button>
</center>

      </form>
      </div>
      <div className='w-full md:4/12'></div>
      
    </div>
    <Footer/>
    </>
  )
}

export default Login
