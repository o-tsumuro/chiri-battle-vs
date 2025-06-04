import { useState, useEffect } from 'react';
import locations from '../data/random_location.json';

export const useRandomLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * locations.length);
    setLocation(locations[randomIndex]);
  }, []);
  return location;
}