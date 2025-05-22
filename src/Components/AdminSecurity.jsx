import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminSecurity = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await adminLogin(email, password);
      console.log("Login Success:", res);

      // Clear fields and navigate
      setEmail("");
      setPassword("");
      if(res.success){
      navigate('/showadmin');
      if(window.location.pathname === '/showadmin'){
        window.location.reload();
      }
      }
      
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Admin login failed. Please check your credentials.");
    }
  };

  return (
    <div className='flex mt-5 pt-5 mb-5 pb-5'>
      <div className='w-full md:w-4/12'></div>
      <div className='w-full md:w-4/12'>
        <center><h1 className='text-3xl mb-5 font-semibold'> Admin Login</h1></center>
        <form onSubmit={formHandler}>
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="..." />
            </svg>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="grow" placeholder="Email" required />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="..." />
            </svg>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder="Password" required />
          </label>

          <center>
            <button type='submit' className='btn btn-primary mt-5 w-96'>Submit</button>
          </center>
        </form>
      </div>
      <div className='w-full md:w-4/12'></div>
    </div>
  );
};

export default AdminSecurity;
