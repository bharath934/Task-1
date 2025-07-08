import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, UserPlus, Eye, EyeOff } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker' as 'employer' | 'seeker',
    company: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.role === 'employer' && !formData.company) {
      setError('Company name is required for employers');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.role, formData.company);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-blue-900/85 to-indigo-900/90"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
              Join TEKFIX Jobs
            </h2>
            <p className="mt-2 text-center text-lg text-teal-100">
              Create your account and start your journey
            </p>
            <p className="mt-4 text-center text-sm text-teal-200">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-teal-300 hover:text-white transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-teal-300" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-4 border border-white/30 placeholder-gray-300 text-white bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:z-10 sm:text-sm transition-all"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-teal-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-4 border border-white/30 placeholder-gray-300 text-white bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:z-10 sm:text-sm transition-all"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-white/30 text-white bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:z-10 sm:text-sm transition-all"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="seeker" className="bg-gray-800">Job Seeker</option>
                  <option value="employer" className="bg-gray-800">Employer</option>
                </select>
              </div>

              {formData.role === 'employer' && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-teal-300" />
                    </div>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-4 border border-white/30 placeholder-gray-300 text-white bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:z-10 sm:text-sm transition-all"
                      placeholder="Enter company name"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-teal-300" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="appearance-none rounded-xl relative block w-full pl-10 pr-12 py-4 border border-white/30 placeholder-gray-300 text-white bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:z-10 sm:text-sm transition-all"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-teal-300 hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-teal-300 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-teal-300" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="appearance-none rounded-xl relative block w-full pl-10 pr-12 py-4 border border-white/30 placeholder-gray-300 text-white bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:z-10 sm:text-sm transition-all"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-teal-300 hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-teal-300 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-300 text-sm text-center bg-red-500/20 py-3 px-4 rounded-xl border border-red-400/30">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;