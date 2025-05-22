import React, { useContext } from 'react'
import AppContext from '../Context/AppContext';
import axios from 'axios';
import { Link,  useNavigate } from 'react-router-dom';


const Adminshowproduct = () => {
  const navigate = useNavigate();
    const url = "http://localhost:3000/api"
    const deleteitem = async (id)=> {
        console.log(id)
        const api = await axios.delete(`${url}/product/${id}`)
        .then((res)=>{
            console.log(res)
            window.location.reload()
        })
        .catch(()=>{
            console.log("error")
        })
        console.log(api.data)
    }

    const logoutAdmin =()=>{
      localStorage.removeItem("role")
      navigate('/adminSec')
      window.location.reload();
    }
    const {products} = useContext(AppContext);
  console.log("show products page===", products)
  return (
    <>
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Origin</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Mode</th>
            <th className="border border-gray-300 px-4 py-2">BestSeller</th>
            <th className="border border-gray-300 px-4 py-2">Qty</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Price Per Unit</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.origin}</td>
              <td className="border border-gray-300 px-4 py-2">{item.category}</td>
              <td className="border border-gray-300 px-4 py-2">{item.mode}</td>
              <td className="border border-gray-300 px-4 py-2">{item.bestSeller}</td>
              <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
              <td className="border border-gray-300 px-4 py-2">{item.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.pricePerUnit}</td>
              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
              <td className='border border-gray-300 py-2'><Link to={`/editproduct/${item._id}`}><button className='btn mr-2'>Edit</button></Link> 
              <button className='btn' onClick={()=> {if (window.confirm('Are you sure you want to delete this item?')) {deleteitem(item._id)}}}>Delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className='btn bg-gray-400' onClick={()=> navigate('/addproduct')}>Add Product</button>
    <button className='btn bg-success' onClick={()=> navigate('/allorders')}>Show All Orders</button>
    <button className='btn bg-red-600' onClick={()=> {logoutAdmin()}}>Logout Admin Panel</button>
    </>
  )
}

export default Adminshowproduct
