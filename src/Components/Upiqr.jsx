import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Upi from 'upiqr';
import AppContext from '../Context/AppContext';

const Upiqr = () => {
  const [imgData, setImgData] = useState('');
  const { cart, clearCart, saveOrderDetails, userAddress, savePaymentDetails } = useContext(AppContext);
  const { p } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const generateQR = () => {
      Upi({
        payeeVPA: 'hargun13singh@oksbi',
        payeeName: 'Hargun Singh',
        amount: `${p}`,
        currency: 'INR',
        transactionNote: 'Payment for Services',
      })
        .then((upi) => setImgData(upi.qr))
        .catch((err) => console.error('QR Generation Error:', err));
    };

    generateQR();
  }, [p]);

  const paymentData = {
    amount: p,
    cartItems: cart.items,
    userAddress,
    payStatus: 'Success',
  };

  const orderData = {
    items:
      cart?.items?.map((item) => ({
        productId: item.productId || item._id,
        name: item.name,
        image: item.image,
        quantity: item.qty,
        price: item.price,
      })) || [],
    totalAmount: p,
    payStatus: 'Success',
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-200 to-pink-100 p-6">
      {/* Instructions Image */}
      <div className="mb-6 text-center">
        <img
          src="https://cdn.zeebiz.com/sites/default/files/2024/01/03/274966-upigpay.jpg"
          alt="UPI Instruction"
          className="mx-auto max-h-96 object-contain rounded-xl shadow-lg"
        />
      </div>

      {/* QR Code Image */}
      <div className="text-center mb-6">
        {imgData ? (
          <img src={imgData} alt="Generated UPI QR" className="h-64 mx-auto shadow-md" />
        ) : (
          <p className="text-gray-600 font-medium">Generating QR code...</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6">
        <button
          className="btn btn-success text-white px-6"
          onClick={() => {
            clearCart();
            saveOrderDetails(orderData);
            savePaymentDetails(paymentData);
            navigate('/Success');
          }}
        >
          Success
        </button>
        <button
          className="btn bg-red-500 hover:bg-red-600 text-white px-6"
          onClick={() => navigate('/Failure')}
        >
          Failure
        </button>
      </div>
    </div>
  );
};

export default Upiqr;
