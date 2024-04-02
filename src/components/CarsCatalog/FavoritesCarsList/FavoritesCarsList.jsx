// FavoritesCarsList.jsx
import React from 'react';
import {  useSelector } from 'react-redux';
import { selectFavorites } from '../../../redux/favoritesSlice';
import FavoritesCarsListItem from './FavoritesCarsListItem'; 


const FavoritesCarsList = () => {
  const favoritesData = useSelector(selectFavorites);
 

  return (
    <div>
      <FavoritesCarsListItem cars={favoritesData} isFavoriteList={true} />
    </div>
  );
};

export default FavoritesCarsList;
