// CarList.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsDataThunk } from '../../../redux/operations';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../../../redux/favoritesSlice';
import Modal from '../../Modal/Modal';
import icons from '../../../images/icons.svg';
import s from '../CarList.module.css';

const FavoritesCarsListItem = ({ cars }) => {
  const dispatch = useDispatch();
  const favoritesData = useSelector(selectFavorites);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCarsDataThunk());
  }, [dispatch]);
  
  const favorites = (car) => favoritesData.some(favorite => favorite.id === car.id);

  const handleToggleFavorites = (car) => {
    if (favorites(car)) {
      dispatch(removeFromFavorites({ id: car.id }));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsOpen(false);
  };

  return (
    <div className={s.carContainer}>
      {cars.map((car) => (
        <div className={s.carCard} key={car.id}>
          <div className={s.imgContainer}>
            <img className={s.carImg} src={car.img} alt={`${car.make} ${car.model}`} />
            <button className={s.iconButton} onClick={() => handleToggleFavorites(car)}>
              <svg className={favorites(car) ? s.iconActive : s.icon}>
                <use xlinkHref={`${icons}#heartIcon`} />
              </svg>
            </button>
          </div>
          <div className={s.paragraphContainer}>
            <p className={s.carParagraph}>{car.make} <span className={s.carModel}>{car.model}</span>, {car.year}</p>
            <p className={s.carParagraph}>{car.rentalPrice}</p>
          </div>
          <div className={s.listContainer}> 
            <ul className={s.carList}>
              <li>{car.address.split(',')[1]} <span className={s.stick}/></li>
              <li>{car.address.split(',')[2]} <span className={s.stick}/></li>
              <li>{car.rentalCompany} <span className={s.stick}/></li>
              <li>{car.type} <span className={s.stick}/></li>
              <li>{car.model} <span className={s.stick}/></li>
              <li>{car.mileage} <span className={s.stick}/></li>
              <li>{car.accessories[0]}</li>
            </ul>
          </div>
          <div className={s.buttonContainer}>
            <button className={s.carButton} onClick={() => openModal(car)}>Learn More</button>
          </div>
        </div>
      ))}
      <Modal isOpen={isOpen} onClose={closeModal} car={selectedCar} />
    </div>
  );
};

export default FavoritesCarsListItem;