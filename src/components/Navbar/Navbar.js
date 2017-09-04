import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = props => (
    <div className="navbar">
        <Link to="/">
            <div className="logo"></div>
        </Link>
    </div>
);

export default Navbar;