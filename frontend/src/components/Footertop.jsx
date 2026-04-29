import React from 'react'
import { Link } from 'react-router-dom';

const Footertop = () => {
  return (
    
 <div>
      {/* ===== IMAGE SECTION ===== */}
      <div className="relative w-full h-[450px]">

        {/* Background Image */}
        <img
          src="/footerimg.jpg"
          alt="Footer"
          className="w-full h-full object-cover brightness-50"
        />

        {/* TEXT + BUTTON ON IMAGE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get your next idea
          </h2>

          <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-semibold text-lg transition">
             

              <Link to="/signup">Sign up</Link>
          </button>

        </div>
      </div>

     
    </div>
  );
};
export default Footertop