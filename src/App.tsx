// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UserForm from './components/UserForm/UserForm';
import UserProfileForm from './components/UserProfileForm/UserProfileForm';

import './App.css';
import ShowProfile from "./components/ShowProfile/ShowProfile.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/create-user" element={<UserForm />} />
                    <Route path="/create-user-profile" element={<UserProfileForm />} />
                    <Route path="/show-user-profile" element={<ShowProfile/>} />
                    <Route path="/" element={<h1>Welcome to the App</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
