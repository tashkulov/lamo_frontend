import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfiles } from '../../store/userSlice'; // Assuming there's a fetchProfiles action
import './Navbar.scss'; // Import your SCSS file

import UserForm from '../UserForm/UserForm'; // Import your UserForm component
import UserProfileForm from '../UserProfileForm/UserProfileForm'; // Import your UserProfileForm component

const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profiles = useSelector((state: RootState) => state.users.profiles);
    const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
    const [activeComponent, setActiveComponent] = useState<'CreateUser' | 'CreateUserProfile' | null>(null);

    // Fetch profiles when component mounts
    useEffect(() => {
        dispatch(fetchProfiles());
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
            {activeComponent === 'CreateUser' && <UserForm />}
            {activeComponent === 'CreateUserProfile' && <UserProfileForm profileId={selectedProfileId} />}
        </div>
    );
};

export default Navbar;
