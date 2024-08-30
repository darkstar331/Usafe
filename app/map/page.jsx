'use client'
import { useState, useEffect } from 'react';
import QuietAreaForm from '../components/QuietAreaForm';
import Map from '../components/Map';
import axios from 'axios';

// getServerSideProps function to fetch data on the server side before rendering the page
export async function getServerSideProps() {
  try {
    const response = await axios.get('https://usafe-uoa.netlify.app/api/map');
    if (response.status === 200) {
      return { props: { initialTaggedLocations: response.data.data } };
    } else {
      return { props: { initialTaggedLocations: [] } };
    }
  } catch (error) {
    console.error('Error fetching tagged locations:', error);
    return { props: { initialTaggedLocations: [] } };
  }
}

export default function MapPage({ initialTaggedLocations }) {
  const [taggedLocations, setTaggedLocations] = useState(initialTaggedLocations);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
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
