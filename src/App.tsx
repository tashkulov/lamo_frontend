import React from 'react';
import UserForm from './components/UserForm/UserForm.tsx';
import UserProfileForm from './components/UserProfileForm/UserProfileForm.tsx';

const App: React.FC = () => {
    return (
        <div>
            <h1>User Management</h1>
            <UserForm />
            <UserProfileForm />
        </div>
    );
};

export default App;
