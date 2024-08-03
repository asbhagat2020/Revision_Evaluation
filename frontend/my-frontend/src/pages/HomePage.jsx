import React from 'react';
import {Search} from '../components/Search';
import {History} from '../components/History';


export const HomePage = () => {
  return (
    <div>
      <h1>Country Information</h1>
      <Search />
      <History />
    </div>
  );
};

