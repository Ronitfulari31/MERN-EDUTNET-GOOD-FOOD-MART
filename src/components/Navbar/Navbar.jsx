import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Nabarcss.css';

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const dirHome = () => {
    navigate('/');
  };
  const [menu, setMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const navi = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    navi('/home');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src={assets.clogo} alt="Logo" className="h-16 w-16 mr-2" />
          <span onClick={dirHome} className="company-name text-xl font-bold text-gray-800 hover:cursor-pointer">GOOD-FOOD MART</span>
        </div>
        <div className="search-bar flex-1 mx-4">
          {/* <input type="text" placeholder="Search for foods..." className="search-input px-4 py-2 w-20 border rounded-lg" /> */}
        </div>
        <ul className="navbar-links flex space-x-4">
          <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}><Link to="/Home" className="navbar-link">Home</Link></li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={`navbar-link ${menu === "menu" ? "active" : ""}`}>Menu</a>
          <a href='#footer' onClick={() => setMenu("contact")} className={`navbar-link ${menu === "contact" ? "active" : ""}`}>Contact us</a>
          <a href='#app-download' onClick={() => setMenu("app-download")} className={`navbar-link ${menu === "app-download" ? "active" : ""}`}>Mobile App</a>
        </ul>
        <div className="navbar-right flex items-center gap-4">
          <img src={assets.search_icon} alt="Search" className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110" />
          <div className="basketicon relative">
            <Link to='/card' ><img src={assets.basket_icon} alt="Basket" className="h-6 w-6" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} className="sign-up bg-cyan-500s text-black px-4 py-2 rounded-lg font-bold transition-transform duration-300  hover:scale-105 focus:outline-none focus:ring-4">Sing UP</button>
          : <div className='navbar-profile' onClick={toggleDropdown}>
            <img src={assets.profile_icon} alt="" />
            <ul className={`nav-profile-dropdown ${isOpen ? 'visible' : ''}`}>
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;