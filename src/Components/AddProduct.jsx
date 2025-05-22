import React, { useContext, useState } from 'react'
import AppContext from '../Context/AppContext';


const AddProduct = () => {
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("Select Origin");
    const [category, setCategory] = useState("Select Category");
    const [qty, setQty] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [pricePerUnit, setPricePerUnit] = useState("Select Price");
    const [price, setPrice] = useState("");
    const [mode, setMode] = useState("Select Mode");
    const [bestSeller, setBestSeller] = useState("Choose BestSeller");
    
    const {AddProduct} = useContext(AppContext);

    const formHandler = async(e)=> {
        e.preventDefault();
        console.log({name,origin,category,qty,description,image,pricePerUnit,price, mode, bestSeller})

        try{
            const result = await AddProduct(name,origin,category,qty,description,image,pricePerUnit,price,mode, bestSeller)
            alert("user add product successfully", result)
        }
        catch(error){
            console.error("Product error", error)
        }
        
    }
    return (
      <>
      <div className='flex  mt-5 pt-5 mb-5 pb-5 '>
          <div className='w-full md:w-4/12'></div>
          <div className='w-full md:w-4/12'>
  
          <form onSubmit={formHandler} className='border mt-5 p-5 shadow-xl br rounded-lg'>
          <center><h1 className='text-3xl mb-5 font-semibold'> Add Product</h1></center>
          <label className="input input-bordered flex items-center gap-2 ">
          <input value={name} onChange={(e)=>setName(e.target.value)} className="grow" placeholder="Product Name" />
          </label>
  
  
  
  
  <select value={origin} onChange={(e)=>setOrigin(e.target.value)} className="select select-bordered w-full  input input-bordered flex items-center gap-2 mt-5" >
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
          <option>Assam</option>
  
          
          
          </select>
        <div className='flex '>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="select select-bordered w-80 input input-bordered items-center gap-2 mt-5 mr-5" >
          <option disabled selected >Select Category</option>
          <option>Punjabi</option>
          <option>South Indian</option>
          <option>North Indian</option>
          <option>Other</option>
          
          </select>
          
          <select value={mode} onChange={(e)=>setMode(e.target.value)} className="select select-bordered w-80 input input-bordered items-center gap-2 mt-5 mr-5" >
          <option disabled selected >Select Mode</option>
          <option>Sweet</option>
          <option>Spicy</option>
          <option>Snacks</option>
          <option>Others</option>
          
          </select>

          <label className="input input-bordered flex items-center gap-2 mt-5 w-64">
          <input value={qty} onChange={(e)=>setQty(e.target.value)} type="number" className="grow" placeholder="Enter Quantity" />
          </label>
          </div>

          <select value={bestSeller} onChange={(e)=>setBestSeller(e.target.value)} className="select select-bordered w-full  input input-bordered flex items-center gap-2 mt-5" >
          <option disabled selected >Choose BestSeller</option>
          <option>Yes</option>
          <option>No</option>
          </select>
  
          <label className="input input-bordered flex items-center gap-2 mt-5">
          <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="grow" placeholder="Description" />
          </label>
  
          <label className="input input-bordered flex items-center gap-2 mt-5">
          <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" className="grow" placeholder="Image Link" />
          </label>
  
          <select value={pricePerUnit} onChange={(e)=>setPricePerUnit(e.target.value)} className="select select-bordered w-full  input input-bordered flex items-center gap-2 mt-5" >
          <option disabled selected >Select Price  </option>
          <option>250 grams</option>
          <option>500 grams</option>
          <option>/kg</option>
          <option>/unit</option>
          <option>/plate</option>
          </select>
  
          <label className="input input-bordered flex items-center gap-2 mt-5">
          <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" className="grow" placeholder="Price(in Rs)" />
          </label>
  
  
  
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

export default AddProduct
