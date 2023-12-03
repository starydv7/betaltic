// src/App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FavoriteList from './components/FavoriteList';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const handleEdit = (favorite) => {
    // Your edit logic
  };

  const handleDelete = (favorite) => {
    // Your delete logic
  };

  const handleUpdate = (favorite) => {
    // Your update logic
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favorite"
          element={<FavoriteList favorites={favorites} onEdit={handleEdit} onDelete={handleDelete} onUpdate={handleUpdate} />}
        />
      </Routes>
    </>
  );
};

export default App;
