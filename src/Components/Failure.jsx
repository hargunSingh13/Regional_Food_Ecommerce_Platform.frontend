import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Failure = () => {
  const navigate = useNavigate();
  return (
    
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-400 to-orange-500">
      <motion.div
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: -360, scale: 1 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="p-5 bg-white rounded-2xl shadow-2xl"
      >
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
          alt="Failure Icon"
          className="h-96 rounded-lg shadow-lg"
          whileHover={{ scale: 1.1, rotate: -10 }}
          transition={{ duration: 0.3 }}
        />
        <motion.h2
          className="text-2xl font-bold text-red-600 mt-4"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          Payment Failed! ❌
        </motion.h2>
      </motion.div>
      <div className="absolute bottom-8">
        <button className="btn bg-red-600 text-white px-6 py-2 rounded shadow-md hover:bg-red-700 transition" onClick={()=> navigate('/checkout')}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Failure

