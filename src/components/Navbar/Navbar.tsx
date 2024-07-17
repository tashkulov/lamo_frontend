import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfiles, fetchUsers, createUser, createUserProfile } from '../../store/userSlice';
import './Navbar.scss';

import UserForm from '../UserForm/UserForm';
import UserProfileForm from '../UserProfileForm/UserProfileForm';
import {User} from "../types.ts";

const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profiles = useSelector((state: RootState) => state.users.profiles);
    const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
    const [activeComponent, setActiveComponent] = useState<'CreateUser' | 'CreateUserProfile' | null>(null);

    // Fetch profiles and users when component mounts
    useEffect(() => {
        dispatch(fetchProfiles());
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleProfileSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const profileId = Number(e.target.value);
        setSelectedProfileId(profileId !== 0 ? profileId : null);
        setActiveComponent(null); // Reset active component when profile is selected
    };

    const handleNavItemClicked = (component: 'CreateUser' | 'CreateUserProfile') => {
        setSelectedProfileId(null); // Reset selected profile when nav item is clicked
        setActiveComponent(component);
    };

    // Example handler for creating a new user
    const handleCreateUser = (userData: Omit<User, 'id'>) => {
        dispatch(createUser(userData));
    };

    // Example handler for creating a new user profile
    const handleCreateUserProfile = (profileData: FormData) => {
        dispatch(createUserProfile(profileData));
    };

    return (
        <div className="navbar">
            <div className="nav-item" onClick={() => handleNavItemClicked('CreateUser')}>
                Create User
            </div>
            <div className="nav-item" onClick={() => handleNavItemClicked('CreateUserProfile')}>
                Create User Profile
            </div>
            <div className="nav-item">
                <select onChange={handleProfileSelect} value={selectedProfileId || 'default'}>
                    <option value="default">Select Profile</option>
                    {profiles.map((profile) => (
                        <option key={profile.userId} value={profile.userId}>
                            {profile.userId}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render selected component based on activeComponent state */}
            {activeComponent === 'CreateUser' && <UserForm onSubmit={handleCreateUser} />}
            {activeComponent === 'CreateUserProfile' && (
                <UserProfileForm
                    profileId={selectedProfileId}
                    onSubmit={handleCreateUserProfile}
                />
            )}
        </div>
    );
};

export default Navbar;
