'use client';
import { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes} ${ampm}`;
    setCurrentTime(timeString);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <header className='text-white flex flex-col items-center pt-10 pb-6 bg-gray-900 shadow-lg'>
      <div className='font-extrabold text-2xl md:text-4xl text-yellow-400 mb-2'>
        University of Alberta
      </div>
      <div className='flex items-center justify-center space-x-6 text-lg'>
        <div className='text-gray-300'>
          {currentTime}
        </div>
      </div>
    </header>
  );
};

export default Header;
