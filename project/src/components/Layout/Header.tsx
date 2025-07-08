import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Briefcase, User, LogOut, Home, PlusCircle, Users, Settings, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationCount] = useState(3); // Mock notification count

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-2 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TEKFIX Jobs
              </span>
            </Link>

            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>

                  {user.role === 'employer' && (
                    <>
                      <Link
                        to="/create-job"
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Post Job</span>
                      </Link>
                      <Link
                        to="/my-jobs"
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>My Jobs</span>
                      </Link>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                    >
                      <Users className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  )}

                  {/* Notifications */}
                  <div className="relative">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50">
                      <Bell className="h-4 w-4" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </button>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>

                  <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <img
                            src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face`}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                          <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full ml-2">
                            {user.role}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
