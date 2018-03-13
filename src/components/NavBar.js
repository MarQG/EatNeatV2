import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav>
        <ul className="navbar__list">
            <li><Link to="/dashboard" className="navbar__item">Dashboard Page</Link></li>
            <li><Link to="/search" className="navbar__item">Search Page</Link></li>     
            <li><Link to="/myweek" className="navbar__item">My Week Page</Link></li>     
            <li><Link to="/favorites" className="navbar__item">Favorites Recipes Page</Link></li>     
            <li><Link to="/grocerylist" className="navbar__item">Grocery List Page</Link></li>     
        </ul>
    </nav>
);

export default NavBar;