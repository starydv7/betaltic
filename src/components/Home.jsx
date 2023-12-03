// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteList from './FavoriteList';

const Home = () => {
  const navigate = useNavigate();
  const [packageName, setPackageName] = useState('');
  const [packageList, setPackageList] = useState([
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'axios',
    'styled-components',
    'prop-types',
    'formik',
    'yup',
    'react-helmet-async',
    'react-query',
    'react-spring',
    'react-icons',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@mui/material',
    '@emotion/react',
    '@emotion/styled',
    'antd'
  ]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [favoriteReason, setFavoriteReason] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showAllPackages, setShowAllPackages] = useState(false);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToFavorites = () => {
    if (selectedPackage) {
      const newFavorite = { package: selectedPackage, reason: favoriteReason };
      setFavorites([...favorites, newFavorite]);
      setSelectedPackage(null);
      setFavoriteReason('');
    }
  };

  // const handleEdit = (favorite) => {
  //   navigate(`/edit/${favorite.package}`, { state: { favorite } });
  // };

  const handleUpdate = (favorite) => {
    const updatedReason = prompt('Enter the updated reason:', favorite.reason);
    if (updatedReason !== null) {
      const updatedFavorites = favorites.map((item) =>
        item.package === favorite.package ? { ...item, reason: updatedReason } : item
      );
      setFavorites(updatedFavorites);
    }
  };

  const handleDelete = (favorite) => {
    const confirmDeletion = window.confirm(`Are you sure you want to delete ${favorite.package}?`);
    if (confirmDeletion) {
      const updatedFavorites = favorites.filter((item) => item.package !== favorite.package);
      setFavorites(updatedFavorites);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">NPM favorite package </h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder="Enter package name"
          className="p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddToFavorites}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add to Favorites
        </button>
      </div>
      <ul className="list-disc pl-6 mb-4">
        {packageList
          .filter((pkg) => pkg.toLowerCase().includes(packageName.toLowerCase()))
          .slice(0, showAllPackages ? packageList.length : 5)
          .map((pkg) => (
            <li key={pkg} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectedPackage"
                  value={pkg}
                  checked={selectedPackage === pkg}
                  onChange={() => setSelectedPackage(pkg)}
                  className="mr-2"
                />
                {pkg}
              </label>
            </li>
          ))}
      </ul>
      {packageList.length > 5 && (
        <button
          onClick={() => setShowAllPackages(!showAllPackages)}
          className="text-blue-500 mb-4 cursor-pointer"
        >
          {showAllPackages ? 'Show Less' : 'Show More'}
        </button>
      )}
      <textarea
        placeholder="Why is this package your favorite?"
        value={favoriteReason}
        onChange={(e) => setFavoriteReason(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
      />

      {/* Favorites Section */}
      <FavoriteList
        favorites={favorites}
        // onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Home;
