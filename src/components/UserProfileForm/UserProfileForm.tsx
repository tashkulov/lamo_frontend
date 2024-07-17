import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUsers } from '../../store/userSlice';
import './UserProfileForm.scss';

interface UserProfileFormProps {
    profileId: number | null;
    onSubmit: (profileData: FormData) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ profileId, onSubmit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const [userId, setUserId] = useState<number | null>(profileId);
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<string>('');
    const [interests, setInterests] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (userId === null) return;

        const formData = new FormData();
        formData.append('userId', userId.toString());
        formData.append('name', gender);
        formData.append('age', age.toString());
        formData.append('gender', gender);
        formData.append('interests', interests);
        formData.append('location', location);
        formData.append('bio', bio);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        onSubmit(formData);
    };

    return (
        <div className="user-profile-form">
            <form onSubmit={handleSubmit}>
                <h2>Create User Profile</h2>
                <div className="form-group">
                    <label htmlFor="userId">Select User</label>
                    <select id="userId" onChange={(e) => setUserId(Number(e.target.value))} value={userId || 'default'}
                            required>
                        <option value="default">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="text"
                        id="age"
                        placeholder="Enter Age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                        type="text"
                        id="gender"
                        placeholder="Enter Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="interests">Interests</label>
                    <input
                        type="text"
                        id="interests"
                        placeholder="Enter Interests"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        placeholder="Enter Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                    />
                </div>
                <button type="submit">Create User Profile</button>
            </form>
        </div>
    );
};

export default UserProfileForm;
