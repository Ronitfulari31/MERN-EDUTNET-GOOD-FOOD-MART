import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='bg-cyan-900 text-white py-8 mt-9' id='footer'>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
            <div className="flex-1 mb-6 md:mb-0">
                <img src={assets.clogo} alt="company_logo" className="max-w-xs mb-4" />
                <div className="flex justify-center mt-4 space-x-4">
                    <img src={assets.facebook_icon} alt="" className="w-6 h-6" />
                    <img src={assets.twitter_icon} alt="" className="w-6 h-6" />
                    <img src={assets.linkedin_icon} alt="" className="w-6 h-6" />
                </div>
            </div>
            <div className="flex-1 mb-6 md:mb-0">
                <h2 className="text-lg mb-4">COMPANY</h2>
                <ul className="list-none p-0">
                    <li className="mb-2 hover:underline cursor-pointer">Home</li>
                    <li className="mb-2 hover:underline cursor-pointer">About us</li>
                    <li className="mb-2 hover:underline cursor-pointer">Delivery</li>
                    <li className="mb-2 hover:underline cursor-pointer">Privacy policy</li>
                </ul>
            </div>
            <div className="flex-1">
                <h2 className="text-lg mb-4">GET IN TOUCH</h2>
                <ul className="list-none p-0">
                    <li className="mb-2">+1-6473645-3432-324234</li>
                    <li className="mb-2">contact@GOOD-FOODMART.com</li>
                </ul>
            </div>
        </div>
        <hr className="border-gray-600 my-6" />
        <p className="footer-copyright text-sm text-gray-500 mt-5 text-center py-2 border-t ">© 2024 CallBasket. All rights reserved.</p>
    </div>
  ) 
}

export default Footer