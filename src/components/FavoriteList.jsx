import React from 'react';

const FavoriteList = ({ favorites, onEdit, onDelete, onUpdate }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Favorites List</h2>
      {favorites.map((favorite) => (
        <div key={favorite.package} className="mb-4 p-4 bg-white rounded shadow-md">
          <p>
            <strong>Package:</strong> {favorite.package}
          </p>
          <p>
            <strong>Reason:</strong> {favorite.reason}
          </p>
          <div className="mt-2">
            {/* <button
              className="bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-600"
              onClick={() => onEdit(favorite)}
            >
              Edit
            </button> */}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
              onClick={() => onDelete(favorite)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => onUpdate(favorite)}
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
