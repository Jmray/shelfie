import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(){

    return(
        <div className='header'>
            <div className='logo'>shelfie</div>
            <Link to='/'>
            <div className='header-link button'>Dashboard</div>
            </Link>
            <Link to='/add'>
            <div className='header-link button'>Add Inventory</div>
            </Link>
        </div>
    )
}