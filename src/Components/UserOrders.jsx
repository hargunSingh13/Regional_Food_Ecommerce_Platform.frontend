import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'
import Headder from './Headder'
import Footer from './Footer';


const UserOrders = () => {
  const { orders } = useContext(AppContext)
  return (
    <>
      <Headder />
      <div className="flex  mt-5  mb-5 pb-5">
      <div className='w-full md:w-2/12'></div>

      <div className='w-full md:w-8/12'>
      <center><h2 className="text-4xl font-bold mb-4">Your Orders</h2></center>

{orders.length === 0 ? (
  <p className='text-3xl'>No orders found.</p>
) : (
  orders.map((order, index) => (
    <div key={order._id || index} className="border p-4 mb-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
      <p>Total: ₹{order.totalAmount}</p>
      <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

      <h4 className="mt-4 font-semibold">Items:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {order.items.map((item, itemIndex) => (
          <div key={item._id || itemIndex} className="border p-2 rounded">
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover rounded"
            />
            <p className="mt-2 font-medium">{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  ))
)}

</div>
      </div>
      <div className='w-full md:w-2/12'></div>

        
      <Footer />
    </>
  );
};

export default UserOrders;

