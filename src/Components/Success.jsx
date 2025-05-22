import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <motion.div
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="p-5 bg-white rounded-2xl shadow-2xl"
      >
        <motion.img
          src="https://th.bing.com/th/id/OIP.VfjVdBdXXlQJVtrsI91i6QHaFE?rs=1&pid=ImgDetMain"
          alt="UPI PIC"
          className="h-96 rounded-lg shadow-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        />
        <motion.h2
          className="text-2xl font-bold text-green-600 mt-4"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          Payment Successful! ✅
        </motion.h2>
      </motion.div>
      <div className="absolute bottom-8">
        <button className="btn bg-green-600 text-white px-6 py-2 rounded shadow-md hover:bg-green-700 transition" onClick={()=> navigate('/userOrders')}>
          View Order
        </button>
      </div>
    </div>

    
    </>
  )
}

export default Success

