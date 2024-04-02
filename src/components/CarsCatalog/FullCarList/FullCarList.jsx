// FullCarList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsDataThunk } from '../../../redux/operations';
import { selectCarsData } from '../../../redux/carsSlice';
import CarList from './CarList';

const FullCarList = () => {
  const dispatch = useDispatch();
  const carData = useSelector(selectCarsData);

  useEffect(() => {
    dispatch(fetchCarsDataThunk());
  }, [dispatch]);

  return (
    <CarList cars={carData} isFavoriteList={false} />
  );
};

export default FullCarList;
