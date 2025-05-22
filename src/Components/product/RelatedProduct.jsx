import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom';

const RelatedProduct = ({ mode }) => {
  const { products,addToCart } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products && mode) {
      const filterProducts = products.filter(
        (i) => i?.mode?.toLowerCase() === mode.toLowerCase()
      );
      setRelatedProducts(filterProducts);
    }
  }, [mode, products]);
  return (
    <>
      <div className='mb-5 mt-5 pb-5 p-5'>
        <h1 className="text-4xl font-semibold text-center mb-7">Explore Related Products </h1>
        <div className='flex flex-wrap gap-7 justify-center mb-5'>
        {relatedProducts?.map((i) =>
          <div key={i._id} className="card bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <figure className='relative overflow-hidden cursor-pointer'>
              <Link to={`/product/${i._id}`} >
                <img src={i.image} alt={i.name} className='w-full h-48 object-cover' />
              </Link>
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-xl font-semibold">{i.name + ` (${i.origin})`}</h2>
              <p className='text-gray-600 text-sm'>{i.description}</p>
              <div className=" flex justify-between items-center mt-3 card-actions justify-end">
                <span className='text-lg font-bold text-green-600'>₹{i.price}/{i.pricePerUnit}</span>
                <button className="btn btn-primary" onClick={() => addToCart(i._id, i.name, i.price, 1, i.image,"productPage")}>Add To Cart</button>
              </div>
            </div>
          </div>

        )}
        </div>
      </div>
    </>
  )
}

export default RelatedProduct
