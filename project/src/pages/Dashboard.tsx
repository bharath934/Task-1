import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJob } from '../contexts/JobContext';
import { Link } from 'react-router-dom';
import { PlusCircle, Briefcase, Users, Building, TrendingUp, Bell, Calendar } from 'lucide-react';
import JobCard from '../components/Jobs/JobCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { jobs, isLoading } = useJob();

  const userJobs = user?.role === 'employer' ? jobs.filter(job => job.postedBy === user.id) : jobs;

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'admin':
        return 'Admin Dashboard - Manage users and jobs across the platform';
      case 'employer':
        return 'Employer Dashboard - Manage your job postings and find talent';
      case 'seeker':
        return 'Job Seeker Dashboard - Find your next opportunity';
      default:
        return 'Welcome to your dashboard';
    }
  };

  const getStats = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
          { label: 'Total Users', value: '156', icon: Users, color: 'from-green-500 to-green-600' },
          { label: 'Companies', value: '23', icon: Building, color: 'from-purple-500 to-purple-600' },
          { label: 'This Month', value: '+12', icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
        ];
      case 'employer':
        return [
          { label: 'My Jobs', value: userJobs.length, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
          { label: 'Applications', value: '45', icon: Users, color: 'from-green-500 to-green-600' },
          { label: 'Views', value: '1,234', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
          { label: 'Active', value: userJobs.filter(j => true).length, icon: Building, color: 'from-orange-500 to-orange-600' }
        ];
      case 'seeker':
        return [
          { label: 'Available Jobs', value: jobs.length, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
          { label: 'Applications', value: '8', icon: Users, color: 'from-green-500 to-green-600' },
          { label: 'Saved Jobs', value: '12', icon: Building, color: 'from-purple-500 to-purple-600' },
          { label: 'Profile Views', value: '156', icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
        ];
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-2 text-lg">{getWelcomeMessage()}</p>
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === 'employer' && (
                <Link
                  to="/create-job"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Post New Job</span>
                </Link>
              )}
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center space-x-2 shadow-md">
                <Bell className="h-5 w-5" />
                <span>3</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getStats().map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-r ${stat.color} rounded-2xl p-4 shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        {user?.role !== 'seeker' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">New application received for Frontend Developer position</span>
                <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Job posting "Backend Developer" was viewed 15 times</span>
                <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Profile updated successfully</span>
                <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.role === 'employer' ? 'My Job Postings' : 'Recent Job Listings'}
            </h2>
            {user?.role === 'seeker' && (
              <Link
                to="/jobs"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 hover:underline"
              >
                <span>View All Jobs</span>
                <TrendingUp className="h-4 w-4" />
              </Link>
            )}
          </div>

          {userJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12">
                <Briefcase className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {user?.role === 'employer' ? 'No jobs posted yet' : 'No jobs available'}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {user?.role === 'employer' 
                    ? 'Start by creating your first job posting to attract top talent.'
                    : 'Check back later for new job opportunities.'
                  }
                </p>
                {user?.role === 'employer' && (
                  <Link
                    to="/create-job"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Post Your First Job
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userJobs.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;