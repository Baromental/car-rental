import React from 'react';
import s from './Favorites.module.css'
import FavoritesCarsList from '../../components/CarsCatalog/FavoritesCarsList/FavoritesCarsList';

const Favorites = () => {
  return (
    <section className={s.favoriteContainer}>
      <FavoritesCarsList/>
    </section>
  );
}

export default Favorites;
