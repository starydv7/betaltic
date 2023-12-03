// src/components/SearchPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteList from './FavoriteList'; // Import the FavoriteList component

const Home = () => {
  const navigate = useNavigate();
  const [packageName, setPackageName] = useState('');
  const [packageList, setPackageList] = useState(['react', 'react-dom', 'react-router-dom']);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [favoriteReason, setFavoriteReason] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = () => {
    if (selectedPackage) {
      setFavorites([...favorites, { package: selectedPackage, reason: favoriteReason }]);
      setSelectedPackage(null);
      setFavoriteReason('');
      // Redirect to the Favorites page after successful addition
      // navigate('/favorite');
    }
  };

  const handleEdit = (favorite) => {
    // Redirect to edit page with the selected favorite
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
      <h2 className="text-2xl font-semibold mb-4">NPM favorite package </h2>
      <div className="flex items-center mb-4">
        {/* Input for searching packages */}
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder="Enter package name"
          className="p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
        />
        {/* Button to add package to favorites */}
        <button
          onClick={handleAddToFavorites}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add to Favorites
        </button>
      </div>
      {/* List of packages */}
      <ul className="list-disc pl-6 mb-4">
        {packageList
          .filter((pkg) => pkg.toLowerCase().includes(packageName.toLowerCase()))
          .map((pkg) => (
            <li key={pkg} className="mb-2">
              <label className="flex items-center">
                {/* Radio button for selecting a package */}
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
      {/* Textarea for entering the reason for adding to favorites */}
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
