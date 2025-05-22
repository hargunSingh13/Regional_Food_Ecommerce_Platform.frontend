import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditProduct = () => {
  const url = "https://regional-food-ecommerce-platform-backend.onrender.com/api";
  const {id} = useParams();

      const [name, setName] = useState("");
      const [origin, setOrigin] = useState("Select Origin");
      const [category, setCategory] = useState("Select Category");
      const [qty, setQty] = useState("");
      const [description, setDescription] = useState("");
      const [image, setImage] = useState("");
      const [pricePerUnit, setPricePerUnit] = useState("Select Price");
      const [price, setPrice] = useState("");
      const [mode, setMode] = useState("Select Mode");
      const [bestSeller, setBestSeller] = useState("Choose BestSeller")
      useEffect(()=>{
        const fetchProduct = async()=>{
          console.log(id)
          const old = await axios.get(`${url}/product/${id}`)
          setName(old.data.product.name)
          setOrigin(old.data.product.origin)
          setCategory(old.data.product.category)
          setQty(old.data.product.qty)
          setDescription(old.data.product.description)
          setImage(old.data.product.image)
          setPricePerUnit(old.data.product.pricePerUnit)
          setPrice(old.data.product.price)
          setMode(old.data.product.mode)
          setBestSeller(old.data.product.bestSeller)
        }
        fetchProduct()
      },[])

      const navigate = useNavigate()
      const formHandler = async (e)=>{
        e.preventDefault();
        console.log("Form submitted with", {name, origin, category, qty, description, image, pricePerUnit, price, mode, bestSeller})
        
        try{
          const result = await axios.put(`${url}/product/${id}`,
            {name, origin, category, qty, description, image, pricePerUnit, price, mode,bestSeller}
          );
          alert("Successfully edit")

          navigate('/showadmin')
          window.location.reload();
        }
        catch(err){
          console.error("Error during registration", err)
        }
      }

  return (
    <>
    
    <div className='flex  mt-5 pt-5 mb-5 pb-5 '>
          <div className='w-full md:w-4/12'></div>
          <div className='w-full md:w-4/12'>
  
          <form onSubmit={formHandler} className='border mt-5 p-5 shadow-xl br rounded-lg'>
          <center><h1 className='text-3xl mb-5 font-semibold'> Edit Product</h1></center>
          <label className='p-3 text-lg '>
            Product Name
            </label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="grow input input-bordered flex w-full items-center gap-2  mb-3"  />
          
  
  
  
  <label className=' p-3 text-lg '>Select Origin</label>
  <select value={origin} onChange={(e)=>setOrigin(e.target.value)} className="select select-bordered w-full  input input-bordered flex items-center gap-2 mb-5 " >
          <option disabled selected >Select Origin</option>
          <option>Punjab</option>
          <option>Uttar Pradesh</option>
          <option>Bengal</option>
          <option>Maharashtra</option>
          <option>Rajasthan</option>
          <option>Gujarat</option>
          <option>Jammu and Kashmir</option>
          <option>Kerela</option>
          <option>Karnataka</option>
          <option>Goa</option>
          </select>
  
  
        
        <label className=' p-3 text-lg'>Select Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="select select-bordered  w-full  input input-bordered items-center gap-2 mb-5 " >
          <option disabled selected >Select Category</option>
          <option>Punjabi</option>
          <option>South Indian</option>
          <option>North Indian</option>
          <option>Other</option>
          
          </select>

          <label className=' p-3 text-lg'>Select Mode</label>
          <select value={mode} onChange={(e)=>setMode(e.target.value)} className="select select-bordered  w-full  input input-bordered items-center gap-2 mb-5 " >
          <option disabled selected >Select Mode</option>
          <option>Sweet</option>
          <option>Spicy</option>
          <option>Snacks</option>
          <option>Others</option>
          
          </select>

          <select value={bestSeller} onChange={(e)=>setBestSeller(e.target.value)} className="select select-bordered w-full  input input-bordered flex items-center gap-2 mt-5" >
          <option disabled selected >Choose BestSeller</option>
          <option>Yes</option>
          <option>No</option>
          </select>
          

          <label className="p-3 text-lg ">Enter Quantity</label>
          <input value={qty} onChange={(e)=>setQty(e.target.value)} type="number" className="grow input input-bordered w-full flex items-center gap-2 mb-5"  />
          
          
  
          <label className="p-3 text-lg mt-5">Write Description</label>
          <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="grow input w-full input-bordered flex items-center gap-2 mb-5"  />
          
  
          <label className="p-3 text-lg mt-5">Image Link</label>
          <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" className="grow input w-full input-bordered flex items-center gap-2 mb-5" />
  
          <label className=' p-3 text-lg'>Select Price</label>
          <select value={pricePerUnit} onChange={(e)=>setPricePerUnit(e.target.value)} className="select select-bordered  w-full  input input-bordered items-center gap-2 mb-5 " >
          <option disabled selected >Select Price  </option>
          <option>250 grams</option>
          <option>500 grams</option>
          <option>Per kg</option>
          <option>Per unit</option>
          <option>Per plate</option>
          </select>
  
          <label className="p-3 text-lg mt-5">Price(in Rs)</label>
          <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" className="grow input w-full input-bordered flex items-center gap-2 mb-5"  />
  
  
  
  <center>
  <button className='btn btn-primary mt-5 w-96' type='submit'>Submit</button>
  </center>
          </form>
          
          </div>
          <div className='w-full md:w-4/12'></div>
        
          
      </div>
      
      </>
  )
}

export default AdminEditProduct
