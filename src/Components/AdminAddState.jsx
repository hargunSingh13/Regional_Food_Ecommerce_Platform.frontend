import React, { useContext, useState } from 'react'
import AppContext from '../Context/AppContext';

const AdminAddState = () => {
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const {addState} = useContext(AppContext);
  const formHandler = async(e)=>{
    e.preventDefault();
    

        try{

            const result = await addState(state, image);
            alert("Admin add state successfully", result);
            console.log("Admin add state successfully--",result)
        }
        catch(error){
            console.error("error", error)
        }
  }
  return (
    <div className='flex'>
      <div className='w-full md:w-4/12'></div>
      <div className='w-full md:w-4/12 mt-5'>
      <form className='border mt-5 p-5 shadow-xl br rounded-lg' onSubmit={formHandler}>
        <center><h1 className='text-3xl mb-5  font-semibold'>Add State</h1></center>
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input type='text' className="grow" placeholder="State Name" value={state} onChange={(e)=>setState(e.target.value)} />
        </label>

        <label className="input input-bordered flex items-center gap-2 ">
          <input type='text' className="grow" placeholder="Image Link" value={image} onChange={(e)=>setImage(e.target.value)} />
        </label>

        <center>
  <button className='btn btn-primary mt-5 w-96' type='submit' >Submit</button>
  </center>
        </form>
      <div className='w-full md:w-4/12'></div>
    </div>
    </div>
  )
}

export default AdminAddState
