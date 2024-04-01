// CarList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarData } from '../../redux/operations';
import s from './CarList.module.css';

const CarList = () => {
  const dispatch = useDispatch();
  const carData = useSelector((state) => state.cars.data);
  const carStatus = useSelector((state) => state.cars.status);
  const carError = useSelector((state) => state.cars.error);

  useEffect(() => {
    if (carStatus === 'idle') {
      dispatch(fetchCarData());
    }
  }, [carStatus, dispatch]);

  if (carStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (carStatus === 'failed') {
    return <div>Error: {carError}</div>;
  }
    
  return (
  <div className={s.carContainer}>
    {carData.map((car) => (
      <div className={s.carCard} key={car.id}>
        <div className={s.carImg}>
          <img src={car.image} alt={`${car.make} ${car.model}`} />
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
          <button className={s.carButton}>Learn More</button>
        </div>
      </div>
    ))}
  </div>
);
};

export default CarList;