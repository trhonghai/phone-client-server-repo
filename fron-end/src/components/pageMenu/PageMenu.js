import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageMenu.scss';


const PageMenu = () => {
  return (
    <div>
        <nav className='--btn-primary --p --mb'>
            <ul className='home-links'>
                <li>
                    <NavLink to='/profile'>Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/wallet'>My wallet</NavLink>
                </li>
                <li>
                    <NavLink to='/wishlist'>Withlist</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default PageMenu