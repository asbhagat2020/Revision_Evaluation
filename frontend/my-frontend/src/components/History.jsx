import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const History = () => {
  const [history, setHistory] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      axios.get('/api/countries/history', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => setHistory(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);
  return (
    <div>
      <h3>Search History</h3>
      {Array.isArray(history) ? (
        history.length === 0 ? (
          <p>No search history</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )
      ) : (
        <p>Invalid data format</p>
      )}
    </div>
  );
  
};

