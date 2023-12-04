// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteList from './FavoriteList';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [packageName, setPackageName] = useState('');
  const [packageList, setPackageList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
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

  const handleSearchPackages = async () => {
    try {
      const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${packageName}`);
      const searchData = response.data.objects;

      // Extract the package names from the search results
      const searchResults = searchData.map((result) => result.package.name);

      // Update the package list with the search results
      setPackageList(searchResults);

      // Clear suggestions when search results are available
      setSuggestions([]);
    } catch (error) {
      console.error('Error searching for packages:', error);
    }
  };

  const handleInputChange = async (input) => {
    setPackageName(input);

    if (input.trim() === '') {
      // Clear suggestions when the input is empty
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://registry.npmjs.org/-/v1/search/suggestions?size=5&q=${input}`);
      const suggestionData = response.data;

      // Extract package name suggestions from the response
      const suggestions = suggestionData.map((suggestion) => suggestion.name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching package suggestions:', error);
    }
  };

  const handleAddToFavorites = () => {
    if (selectedPackage && favoriteReason) {
      // Check if the selected package is not already in favorites
      if (!favorites.some((fav) => fav.package === selectedPackage)) {
        // Add package to favorites
        const newFavorite = { package: selectedPackage, reason: favoriteReason };
        setFavorites([...favorites, newFavorite]);
        setSelectedPackage(null);
        setFavoriteReason('');

        // Provide feedback to the user
        alert('Package added to favorites!');
      } else {
        alert('You have already added this package to favorites.');
      }
    } else {
      alert('Please select a package and provide a reason.');
    }
  };

  const handleEdit = (favorite) => {
    navigate(`/edit/${favorite.package}`, { state: { favorite } });
  };

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
      <h2 className="text-2xl font-semibold mb-4">NPM Favorite Package </h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={packageName}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter package name"
          className="p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearchPackages}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Search Packages
        </button>
      </div>

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <ul className="list-disc pl-6 mb-4">
          {suggestions.map((suggestion) => (
            <li key={suggestion} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectedPackage"
                  value={suggestion}
                  checked={selectedPackage === suggestion}
                  onChange={() => setSelectedPackage(suggestion)}
                  className="mr-2"
                />
                {suggestion}
              </label>
            </li>
          ))}
        </ul>
      )}

      {/* Add to Favorites Button */}
      <button
        onClick={handleAddToFavorites}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
      >
        Add to Favorites
      </button>

      {/* Package List Section */}
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

      {/* Reason Textarea */}
      <textarea
        placeholder="Why is this package your favorite?"
        value={favoriteReason}
        onChange={(e) => setFavoriteReason(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
      />

      {/* Favorites Section */}
      <FavoriteList
        favorites={favorites}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Home;
