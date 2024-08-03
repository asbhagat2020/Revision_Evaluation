import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from '../hooks/useAuth';
import {CountryCard} from './CountryCard';
export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      axios.get('/api/countries/favorites', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => setFavorites(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);
  const handleFavoriteToggle = async (countryCode) => {
    try {
      await axios.post('/api/countries/favorite', { countryCode }, { headers: { Authorization: localStorage.getItem('token') } });
      setFavorites(prev => prev.filter(fav => fav.countryCode !== countryCode));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Favorites</h2>
      {Array.isArray(favorites) && favorites.map(fav => (
        <CountryCard
          key={fav.countryCode}
          country={fav}
          isFavorite
          onFavoriteToggle={() => handleFavoriteToggle(fav.countryCode)}
        />
      ))}
    </div>
  );
  
};

