import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';  // Adjust this import based on where your context is defined

const AdminAllOrders = () => {
  const { orderDetails } = useContext(AppContext);
  console.log("order details", orderDetails);

  return (
    <>
      <h1 className="text-center w-full mt-5 mb-5 font-bold text-2xl">All Orders</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {orderDetails?.map((order) => (
          <div key={order._id} className="w-full md:w-6/12 lg:w-4/12 xl:w-3/12 p-5 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">User Details:</h2>
            <p><strong>User Name:</strong> {order.userAddress.fullName}</p>
            <p><strong>Address:</strong> {order.userAddress.address}</p>
            <p><strong>City:</strong> {order.userAddress.city}</p>
            <p><strong>State:</strong> {order.userAddress.state}</p>
            <p><strong>Country:</strong> {order.userAddress.country}</p>
            <p><strong>Email:</strong> {order.userAddress.email}</p>
            <p><strong>Phone no.:</strong> {order.userAddress.phoneNumber}</p>
            <hr className="my-4"/>
            <h3 className="text-lg font-semibold">Cart Items:</h3>
            {order.cartItems?.map((item, index) => (
              <div key={index} className="mb-2 ">
                <p><strong>Product Name:</strong> {item.name}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Quantity:</strong> {item.qty}</p>
                <hr className="my-2"/>
              </div>
            ))}
            <p><strong>Total Amount:</strong> ₹{order.amount}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminAllOrders;
