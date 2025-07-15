import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Headder = () => {
  const {
    isAuthenticated,
    products,
    setFilterData,
    Logoutuser,
    cart,
    sum,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const filterbyMode = (mod) => {
    navigate(`/category/${mod}`);
    setIsDropdownOpen(false);
  };

  const filterByBestSeller = () => {
    navigate('/');
    setFilterData(products.filter((p) => p.bestSeller === 'Yes'));
    setIsDropdownOpen(false);
  };

  const profileActions = (
    <>
      {!isAuthenticated ? (
        <>
          <li>
            <a href="/log">Login</a>
          </li>
          <li>
            <a href="/reg">Register</a>
          </li>
        </>
      ) : (
        <>
          <li>
            {/* <a onClick={() => navigate('/userOrders')}> */}
            <Link to="/userOrders">
            <a >
              All Orders
            </a>
            </Link>
          </li>
          <li>
           <button
  className="menu-item"
  onClick={() => {
    Logoutuser();
    navigate('/log');
    setIsDropdownOpen(false);
  }}
>
  Logout
</button>

          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-100">
      <div className="navbar flex-wrap justify-between px-4 py-2">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-600">Flavors of India</h1>

        {/* Desktop Mode Options */}
        <div className="hidden md:flex space-x-4">
          <button onClick={filterByBestSeller} className="btn btn-ghost">
            All
          </button>
          <button onClick={() => filterbyMode('Sweet')} className="btn btn-ghost">
            SWEET
          </button>
          <button onClick={() => filterbyMode('Spicy')} className="btn btn-ghost">
            SPICY
          </button>
          <button onClick={() => filterbyMode('Snacks')} className="btn btn-ghost">
            EVENING SNACKS
          </button>
          <button onClick={() => filterbyMode('Others')} className="btn btn-ghost">
            OTHER
          </button>
        </div>

        {/* Hamburger Toggle for Mobile */}
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Common area: Search, Cart, Avatar */}
        <div className="flex space-x-4 items-center flex-wrap">
          <form onSubmit={formHandler}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="input input-bordered w-40 max-w-xs"
            />
          </form>

          {/* Cart */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-warning">{cart?.items?.length}</span>
              </div>
            </button>
            <div className="card card-compact dropdown-content bg-base-100 mt-3 w-52 shadow z-[1]">
              <div className="card-body">
                <span className="text-lg font-bold">{cart?.items?.length} Items</span>
                <span className="text-blue-700">Subtotal: Rs{sum}</span>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/cart')}>
                  View cart
                </button>
              </div>
            </div>
          </div>

          {/* User Avatar */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                />
              </div>
            </button>
            <ul className="menu menu-sm dropdown-content bg-base-100 mt-3 w-24 p-2 shadow z-[1]">
              {profileActions}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 pb-4 bg-base-100">
          <button onClick={filterByBestSeller} className="btn btn-ghost w-full text-left">
            All
          </button>
          <button onClick={() => filterbyMode('Sweet')} className="btn btn-ghost w-full text-left">
            SWEET
          </button>
          <button onClick={() => filterbyMode('Spicy')} className="btn btn-ghost w-full text-left">
            SPICY
          </button>
          <button onClick={() => filterbyMode('Snacks')} className="btn btn-ghost w-full text-left">
            EVENING SNACKS
          </button>
          <button onClick={() => filterbyMode('Others')} className="btn btn-ghost w-full text-left">
            OTHER
          </button>
          <hr />
          <ul className="menu menu-sm">
            {profileActions}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Headder;
