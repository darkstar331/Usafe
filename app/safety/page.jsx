'use client'
import { useState } from 'react';
import { FaRegLightbulb, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';

export default function SafetyTips() {
  const tips = [
    {
      title: 'Stay Alert',
      content: 'Always be aware of your surroundings. Avoid distractions like your phone or headphones while walking.',
    },
    {
      title: 'Use Campus Security Services',
      content: 'Use Safewalk to get a walking escort anywhere on campus, especially at night. Call 780-492-5563 to request.',
    },
    {
      title: 'Know Emergency Numbers',
      content: 'Familiarize yourself with the campus emergency numbers: U of A Protective Services (780-492-5050) and 911 for emergencies.',
    },
    {
      title: 'Trust Your Instincts',
      content: 'If something doesn’t feel right, leave the area and seek help. Trust your instincts and prioritize your safety.',
    },
  ];

  return (
    <main className="bg-[#111827] text-white mt-7 md:mt-16 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Safety Tips for University of Alberta Students</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your safety is our priority. Here are some essential tips to help you stay safe on and around the campus.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <SafetyTipCard key={index} title={tip.title} content={tip.content} />
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Campus Safety Resources</h2>
          <div className="flex flex-col items-center space-y-6">
            <a href="https://www.ualberta.ca/protective-services" target="_blank" rel="noopener noreferrer" className="text-yellow-400 text-xl hover:underline flex items-center space-x-2">
              <FaMapMarkedAlt />
              <span>Find Safe Locations on Campus</span>
            </a>
            <a href="tel:780-492-5563" className="text-yellow-400 -ml-3 md:ml-0 text-xl hover:underline flex items-center space-x-2">
              <FaPhoneAlt />
              <span>Call Safewalk: 780-492-5563</span>
            </a>
        
          </div>
        </section>
      </div>
    </main>
  );
}

function SafetyTipCard({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
        <FaRegLightbulb className={`text-yellow-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="mt-4 text-gray-300">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
