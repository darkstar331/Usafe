import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';

hours = hours % 12;
hours = hours ? hours : 12;

const Header = () => {
  return (
    <header className='text-white flex flex-col items-center pt-10 pb-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg'>
      <div className='relative'>
        <h1 className='font-extrabold text-3xl md:text-5xl text-yellow-400 mb-2'>
          University of Alberta
        </h1>
        <div className='absolute inset-0 bg-yellow-400 opacity-20 blur-2xl animate-pulse'></div>
      </div>
      <div className='flex items-center justify-center space-x-6 text-lg mt-4'>
        <div className='flex items-center space-x-2 text-gray-300 transition transform hover:scale-105 hover:text-white'>
          <FaLocationDot className='text-red-500' />
          <span>Edmonton, AB</span>
        </div>
        <div className='text-gray-300 transition transform hover:scale-105 hover:text-white'>
          {hours}:{minutes} <span className='text-yellow-400'>{ampm}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
