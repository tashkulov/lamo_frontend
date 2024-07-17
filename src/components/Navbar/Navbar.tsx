// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'; // Import your SCSS file

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <div className="nav-item">
                <Link to="/create-user">Create User</Link>
            </div>
            <div className="nav-item">
                <Link to="/create-user-profile">Create User Profile</Link>
            </div>
                <div className="nav-item">
                <Link to="/show-user-profile"> Show Profile</Link>
            </div>
        </div>
    );
};

export default Navbar;
