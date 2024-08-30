'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

const userLocationIcon = L.divIcon({
  html: renderToString(<FaHome style={{ color: 'blue', fontSize: '32px' }} />),
  className: 'custom-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const taggedLocationIcon = L.divIcon({
  html: renderToString(<FaMapMarkerAlt style={{ color: 'red', fontSize: '32px' }} />),
  className: 'custom-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function Map({ taggedLocations = [], userLocation, coordinates }) {
  const defaultCenter = [53.5232, -113.5263];
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
    } else if (coordinates && coordinates.latitude && coordinates.longitude) {
      setMapCenter([coordinates.latitude, coordinates.longitude]);
    } else {
      setMapCenter(defaultCenter);
    }
  }, [userLocation, coordinates]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={15}
      className="w-full h-[326px] md:h-[420px] lg:h-[520px] rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {taggedLocations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={taggedLocationIcon}
        >
          <Popup className="font-semibold text-gray-800">
            <strong>{location.name}</strong><br />
            {location.description}
          </Popup>
        </Marker>
      ))}
      {userLocation && userLocation.latitude && userLocation.longitude && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
          <Popup className="font-semibold text-gray-800">Your Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
