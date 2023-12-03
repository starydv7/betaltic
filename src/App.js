// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Assuming your Home component is in SearchPage.js
import FavoriteList from './components/FavoriteList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<FavoriteList />} />
    </Routes>
  );
};

export default App;
