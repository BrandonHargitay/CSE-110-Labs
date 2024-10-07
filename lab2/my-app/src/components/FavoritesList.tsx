import React from 'react';

interface FavoritesListProps {
  favorites: string[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <div className="favorites-section">
      <h3>Favorite Notes:</h3>
      <ul>
        {favorites.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;