'use client';

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../context/UserContext';

export default function Report() {
  const { user } = useUser(); // Get user details from UserContext
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to submit a report.');
      return;
    }

    try {
      const reportData = {
        name: user.name,
        email: user.email, 
        incidentType: formData.incidentType,
        location: formData.location,
        description: formData.description,
      };

      const response = await axios.post('/api/save-report', reportData);

      if (response.status === 201) {
        toast.success('Report submitted successfully!', {
          position: 'top-center',
        });
        setFormData({
          incidentType: '',
          location: '',
          description: '',
        });
      }
    } catch (error) {
      toast.error('Failed to submit the report. Please try again.');
      console.error(error);
    }
  };

  return (
    <main className="bg-[#111827] text-white min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Report an Incident
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Incident Type */}
          <div className="mb-4">
            <label htmlFor="incidentType" className="block text-gray-300 mb-2">
              Type of Incident
            </label>
            <select
              id="incidentType"
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" disabled>Select an incident type</option>
              <option value="theft">Theft</option>
              <option value="vandalism">Vandalism</option>
              <option value="harassment">Harassment</option>
              <option value="assault">Assault</option>
              <option value="accident">Accident</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-300 mb-2">
              Location of Incident
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter the location"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief description of the incident"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition-colors duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
    </main>
  );
}
