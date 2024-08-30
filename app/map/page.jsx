'use client'
import { useState, useEffect } from 'react';
import QuietAreaForm from '../components/QuietAreaForm';
import Map from '../components/Map';
import axios from 'axios';

export default function MapPage() {
  const [taggedLocations, setTaggedLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch all tagged locations when the component mounts
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/map');
        if (response.status === 200) {
          setTaggedLocations(response.data.data);
        } else {
          console.error('Failed to fetch tagged locations');
        }
      } catch (error) {
        console.error('Error fetching tagged locations:', error);
      }
    };

    fetchTags();

    // Optionally fetch the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  const handleTagSubmit = async (newTag) => {
    try {
      const response = await axios.post('/api/map', newTag);
      if (response.status === 201) {
        setTaggedLocations([...taggedLocations, response.data.data]);
      } else {
        alert('Failed to save the tagged location.');
      }
    } catch (error) {
      console.error('Error saving tagged location:', error);
      alert('An error occurred while saving the tagged location. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">Tag a Quiet Area</h1>
      <div className="mb-8">
        <QuietAreaForm onSubmit={handleTagSubmit} />
      </div>
      <div>
        <Map taggedLocations={taggedLocations} userLocation={userLocation} />
      </div>
    </div>
  );
}
