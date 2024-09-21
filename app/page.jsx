'use client';
import Link from 'next/link';
import { FaMapMarkedAlt, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import Header from './components/Headers';
import './globals.css'; // Import the CSS file

export default function Home() {

  return (
    <main className="bg-[#111827] text-white min-h-screen">
      <Header />
      <div className="p-8 md:mt-16">
        {/* Project Description */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Welcome to Usafe</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Usafe is a campus safety app designed to ensure your security and well-being.
            Whether you need to quickly report an emergency, find your way around campus,
            or access other essential safety features, Usafe is here to help.
          </p>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:mt-28">
          {/* SOS Report Card */}
          <Link href="/report" passHref>
            <div
              className="cursor-pointer bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:bg-red-600 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="mb-4 text-red-400 text-6xl animate-pulse">
                <FaExclamationTriangle />
              </div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">SOS Report</h2>
              <p className="text-gray-300">
                Quickly report emergencies and alert campus security with a single tap.
              </p>
            </div>
          </Link>

          {/* Campus Map Card */}
          <Link href="/map" passHref>
            <div className="cursor-pointer bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:bg-blue-600 hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-4 text-blue-400 text-6xl animate-pulse">
                <FaMapMarkedAlt />
              </div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Campus Map</h2>
              <p className="text-gray-300">
                Navigate the campus easily and Find quiet Study areas for study or chilling
              </p>
            </div>
          </Link>

          {/* Safety Tips Card */}
          <Link href="/safety" passHref>
          <div className="cursor-pointer bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:bg-green-600 hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="mb-4 text-green-400 text-6xl animate-pulse">
              <FaShieldAlt />
            </div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Safety Tips</h2>
            <p className="text-gray-300">
              Access essential safety tips to keep yourself secure on campus.
            </p>
          </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
