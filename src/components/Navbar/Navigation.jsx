import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={s.navContainer}>
      <ul className={s.navList}>
        <li >
          <NavLink className={s.navItem} to='/'>Home</NavLink>
        </li>
        <li >
          <NavLink className={s.navItem} to='/catalog'>Catalog</NavLink>
        </li>
        <li >
          <NavLink className={s.navItem} to='/favorites'>Favorites</NavLink>
        </li>
      </ul>
    </nav>
  )
}
