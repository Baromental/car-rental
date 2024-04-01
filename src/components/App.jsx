import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Navbar/Layout';
import Home from 'pages/Home/Home';
import Catalog from 'pages/Сatalog/Catalog';
import Favorites from 'pages/Favorites/Favorites';

const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} ></Route>
          <Route path='catalog' element={<Catalog/>}></Route>
          <Route path='favorites' element={<Favorites/>}></Route>
        </Route>
      </Routes> 
    </div>
  );
}

export default App;