import React from 'react';

export const CountryCard = ({ country, isFavorite, onFavoriteToggle }) => {
  return (
    <div className={`country-card ${isFavorite ? 'favorite' : ''}`}>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
      <p>Currency: {Object.keys(country.currencies)[0]}</p>
      <p>Capital: {country.capital[0]}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <button onClick={onFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

