import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useRazorpay } from 'react-razorpay'
import Headder from './Headder'
import Footer from './Footer'

const Checkout = () => {
  const { userAddress, cart, savePaymentDetails, clearCart ,addToCart, decreaseQty, removeProduct, sum, saveOrderDetails} = useContext(AppContext)
  const [p, setP] = useState(0)
  const Razorpay = useRazorpay();
  const navigate = useNavigate();
  useEffect(() => {
    let total = 0;
    if (cart?.items) {
      cart.items.forEach((i) => {
        total += i.price
      })
    }
    setP(total)
  }, [cart]);

  const paymentHandler = async (response) => {
    const { razorpay_payment_id } = response;
    console.log("razorpay_payment_id:- ", razorpay_payment_id)
    // console.log("razorpay_order_id:- ", razorpay_order_id)
    // console.log("razorpay_signature:- ", razorpay_signature)
    if (!razorpay_payment_id) {
      alert("Payment failed");
      navigate('/fail');
      return;
    }

    const generateDummyOrderId = () => {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomNum = Math.floor(Math.random() * 100000); // Random number between 0-99999
      return `order_${timestamp}_${randomNum}`;
    };
    // Save payment details to the backend
    const paymentData = {
      paymentId: razorpay_payment_id,
      orderId: generateDummyOrderId(),
      // orderId: razorpay_order_id,
      // signature: razorpay_signature,
      amount: p,
      cartItems: cart.items,
      userAddress,
      payStatus: "Success",
    };

    const orderData = {
      items: cart.items.map(item => ({
        productId: item.productId || item._id,
        name: item.name,
        image: item.image,
        quantity: item.qty,
        price: item.price
      })),
      totalAmount: p,
      payStatus: "Success",
    }
    

    const result = await savePaymentDetails(paymentData);
    const result2 = await saveOrderDetails(orderData);

    if (result.success) {
      console.log("Payment successful!");
      clearCart()
      navigate('/success');
    } else {
      alert("Failed to save payment details. Please contact support.");
      navigate('/fail');
    }
  };

  const handlePayment = () => {
    if (!Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_A3RM3Asww6uWvF", // Replace with your Razorpay key
      amount: `${p}` * 100, // Convert to smallest currency unit
      currency: "INR",
      name: "Gadget Galaxy",
      description: "Testing Payment Gateway",
      handler: paymentHandler,
      prefill: {
        name: userAddress?.fullName || "Guest",
        email: userAddress?.email || "gadgetgalaxy3010@gmail.com",
        contact: userAddress?.phoneNumber || "9999999999",
      },
      theme: {
        color: "#F46432",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <>
    <Headder/>
  <div className="flex justify-center">
    <div className="w-full md:w-8/12">

      <center>
        <h1 className="text-3xl mb-5 font-semibold">Order Summary</h1>
      </center>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-xl">Product's Details</th>
            <th className="border p-2 text-xl">Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-lg font-medium">Product Img</th>
                    <th className="border p-2 text-lg font-medium">Name</th>
                    <th className="border p-2 text-lg font-medium">Price</th>
                    <th className="border p-2 text-lg font-medium">Qty</th>
                    <th className="border p-2 text-lg font-medium">Qty++</th>
                    <th className="border p-2 text-lg font-medium">Qty--</th>
                    <th className="border p-2 text-lg font-medium">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loop through cart items */}
                  {cart?.items?.map((item) => (
                    <tr key={item._id}>
                      <td className="border p-2">
                        <center>
                          <img className="h-20 w-20" src={item.image} alt={item.name} />
                        </center>
                      </td>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.price}</td>
                      <td className="border p-2">{item.qty}</td>
                      <td className="border p-2">
                        <center>
                          <button className="btn btn-success font-bold text-xl p-2" onClick={()=> addToCart(item.productId, item.name, item.price/item.qty, 1, item.image,"")}>+</button>
                        </center>
                      </td>
                      <td className="border p-2">
                        <center>
                          <button className="btn btn-warning font-bold text-xl p-2" onClick={()=> decreaseQty(item.productId,1)}>-</button>
                        </center>
                      </td>
                      <td className="border p-2">
                        <center>
                          <button className="btn font-bold text-xl p-2" onClick={()=> removeProduct(item.productId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </center>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td className="border p-2">
              <center>
                {/* Shipping Address Details */}
                <table className="w-full">
                  <tr>
                    <td>Name:</td>
                    <td>{userAddress?.fullName?.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{userAddress?.email}</td>
                  </tr>
                  <tr>
                    <td>Contact No.:</td>
                    <td>{userAddress?.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>City:</td>
                    <td>{userAddress?.city?.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td>State:</td>
                    <td>{userAddress?.state?.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td>Country:</td>
                    <td>{userAddress?.country?.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td>Pin Code:</td>
                    <td>{userAddress?.pincode}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{userAddress?.address}</td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </tbody>
      </table>

      
      <div className="mt-5 mb-7">
      <div className='text-2xl mb-2'>
        <span className='font-bold'>Total:</span> ₹{sum}
      </div>
        <Link to={`/upiqr/${p}`}>
          <button className="btn">Pay with UPI</button>
        </Link>
        <button className="btn btn-success" onClick={handlePayment}>
          Pay with Razorpay
        </button>
      </div>
      

    </div>
  </div>
  <Footer/>
</>

  )
}



export default Checkout
