import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import ProfileForm from '../components/Profile/ProfileForm';

const Profile: React.FC = () => {
  const { user, login } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  const handleProfileUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    // Update the auth context
    const token = localStorage.getItem('token');
    if (token) {
      login(updatedUser.email, 'password').catch(console.error);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileForm user={currentUser} onUpdate={handleProfileUpdate} />
      </div>
    </div>
  );
};

export default Profile;