import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { CountryCard } from "./CountryCard";
import { useAuth } from "../hooks/useAuth";

export const Search = () => {
  const [currencyCode, setCurrencyCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { user } = useAuth();
  const searchInputRef = useRef(null);
  useEffect(() => {
    searchInputRef.current.focus();
    if (user) {
      axios
        .get("/api/countries/history", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => setSearchHistory(res.data))
        .catch((err) => console.error(err));
      axios
        .get("/api/countries/favorites", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/countries/currency/${currencyCode}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setCountries(res.data);
      await axios.post(
        "/api/countries/history",
        { currencyCode },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setSearchHistory((prev) => [currencyCode, ...new Set(prev)].slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };
  const handleFavoriteToggle = async (countryCode) => {
    try {
      await axios.post(
        "/api/countries/favorite",
        { countryCode },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setFavorites((prev) => {
        const isFavorite = prev.some((fav) => fav.countryCode === countryCode);
        if (isFavorite)
          return prev.filter((fav) => fav.countryCode !== countryCode);
        return [...prev, { countryCode }];
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={currencyCode}
        onChange={(e) => setCurrencyCode(e.target.value)}
        placeholder="Enter currency code"
        ref={searchInputRef}
      />
      <button onClick={handleSearch}>Search</button>
      {Array.isArray(countries) ? (
        countries.map((country) => (
          <CountryCard
            key={country.cca2}
            country={country}
            isFavorite={favorites.some((fav) => fav.countryCode === country.cca2)}
            onFavoriteToggle={() => handleFavoriteToggle(country.cca2)}
          />
        ))
      ) : (
        <p>No countries found</p>
      )}
      <div>
        <h3>Search History</h3>
        {Array.isArray(searchHistory) && searchHistory.length === 0 ? (
          <p>No search history</p>
        ) : (
          <ul>
            {Array.isArray(searchHistory) ? (
              searchHistory.map((history, index) => (
                <li key={index}>{history}</li>
              ))
            ) : (
              <p>Search history is not available</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
  
};
