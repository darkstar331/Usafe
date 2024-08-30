'use client'
import { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function QuietAreaForm({ onSubmit }) {
  const [buildingName, setBuildingName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const query = `${buildingName} University of Alberta Edmonton Canada`;
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = response.data;

      if (data.length > 0) {
        const { lat, lon } = data[0];
        onSubmit({ name: buildingName, description, latitude: parseFloat(lat), longitude: parseFloat(lon) });
        setBuildingName('');
        setDescription('');
      } else {
        alert('Coordinates not found for the provided building name.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('An error occurred while fetching coordinates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 shadow-lg rounded-lg w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-yellow-400">Building Name</label>
        <input
          type="text"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          className="mt-2 p-3 block w-full border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-black"
          placeholder="Enter building name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-yellow-400">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-3 block w-full border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-black"
          placeholder="Enter a brief description"
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className={`bg-yellow-500 text-black px-6 py-2 mt-5 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform transform ${loading ? 'scale-95' : 'scale-100'}`}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Tag this Place'}
        </button>
      </div>
    </form>
  );
}

export default QuietAreaForm;
