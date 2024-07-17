import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfiles, fetchUsers } from '../../store/userSlice';

const ShowProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const profiles = useSelector((state: RootState) => state.users.profiles);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProfiles());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUserId !== null) {
            const profile = profiles.find((profile) => profile.userId === selectedUserId);
            setSelectedProfile(profile);
        } else {
            setSelectedProfile(null);
        }
    }, [selectedUserId, profiles]);

    const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = Number(e.target.value);
        setSelectedUserId(userId !== 0 ? userId : null);
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="userId">Select User</label>
                <select id="userId" onChange={handleUserSelect} required>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            {selectedProfile && (
                <div className="profile-details">
                    <h2>Profile Details</h2>
                    <p><strong>Name:</strong> {selectedProfile.name}</p>
                    <p><strong>Age:</strong> {selectedProfile.age}</p>
                    <p><strong>Gender:</strong> {selectedProfile.gender}</p>
                    <p><strong>Interests:</strong> {selectedProfile.interests}</p>
                    <p><strong>Location:</strong> {selectedProfile.location}</p>
                    <p><strong>Bio:</strong> {selectedProfile.bio}</p>
                    <p>
                        <strong>Profile Image:</strong>
                        {selectedProfile.profileImageUrl ? (
                            <img src={`http://localhost:3000/${selectedProfile.profileImageUrl.replace(/\\/g, '/')}`} alt="Profile" onError={(e) => e.currentTarget.src = '/path/to/fallback-image.png'} />
                        ) : (
                            <span>No Image Available</span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ShowProfile;
