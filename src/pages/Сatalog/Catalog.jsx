import React, { useEffect } from 'react';
import s from './Catalog.module.css'
import FullCarList from '../../components/CarsCatalog/FullCarList/FullCarList';
import { useDispatch } from 'react-redux';
import { fetchCarsDataThunk } from '../../redux/operations';

const Catalog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarsDataThunk({ page: 1, make: null }));
  }, [dispatch]);

  return (
    <section className={s.catalogContainer}>
      <FullCarList/>
    </section>
  );
};

export default Catalog;