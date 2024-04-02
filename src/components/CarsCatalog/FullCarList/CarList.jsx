// CarList.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsDataThunk, fetchMoreCarsDataThunk } from '../../../redux/operations';
import { selectCarsData, selectCurrentPage } from '../../../redux/carsSlice';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../../../redux/favoritesSlice';
import Modal from '../../Modal/Modal';
import Select from 'react-select';
import icons from '../../../images/icons.svg';
import s from '../CarList.module.css';

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsData);
  const currentPage = useSelector(selectCurrentPage);
  const favoritesData = useSelector(selectFavorites);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [makeOptions, setMakeOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchCarsDataThunk());
  }, [dispatch]);

  useEffect(() => {
    const uniqueMakes = [...new Set(cars.map(car => ({ label: car.make, value: car.make })))];
    setMakeOptions(uniqueMakes);
  }, [cars]);

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

  const loadMoreCars = () => {
    dispatch(fetchMoreCarsDataThunk(currentPage + 1));
  };

  const handleSearch = () => {
  };

  return (
    <div className={s.elementContainer}>
      <div className={s.searchContainer}>
        <Select
          options={makeOptions}
          isClearable
          onChange={(selectedOption) => setSearchText(selectedOption ? selectedOption.value : '')}
          placeholder="Enter the text:"
        />
        <button className={s.searchButton} onClick={handleSearch}>Search</button>
      </div>
      <div className={s.carContainer}>
        {cars
          .filter(car => car.make.toLowerCase().includes(searchText.toLowerCase()))
          .map((car) => (
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
      <button className={s.loadButton} onClick={loadMoreCars}>Load More</button>
    </div>
  );
};

export default CarList;
