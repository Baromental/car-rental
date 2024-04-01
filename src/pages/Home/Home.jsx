import React from 'react';
import s from './Home.module.css'
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <section className={s.homeContainer}>
      <h1 className={s.homeTitle}>Hello and welcome to the Car Rental family</h1>
      <p className={s.homeParagraph}>Please visit {<NavLink className={s.homeLink} to='/catalog'>catalog</NavLink>} to choose a car especially for you!
      You can save the cars you like and check them in your {<NavLink className={s.homeLink} to='/favorites'>favorites</NavLink>}. 
      </p>
    </section>
  );
}

export default Home;
