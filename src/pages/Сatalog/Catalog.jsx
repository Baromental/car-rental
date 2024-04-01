import React from 'react';
import CarList from 'components/CarList/CarList';
import s from './Catalog.module.css'

const Catalog = () => {

  return (
    <section className={s.catalogContainer}>
      <CarList/>
    </section>
  );
};

export default Catalog;
