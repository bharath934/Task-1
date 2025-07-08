import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, Users, Building, TrendingUp, Search, MapPin, Star, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-purple-900/90"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl">
                <Briefcase className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                TEKFIX Jobs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect talented professionals with innovative companies. Find your dream job or discover exceptional talent in the tech industry.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="bg-white/10 backdrop-blur-lg text-white px-10 py-4 rounded-xl hover:bg-white/20 transition-all duration-200 font-semibold text-lg border border-white/30 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                >
                  Sign In
                </Link>
              </div>
            )}
            
            {user && (
              <div className="flex justify-center">
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose TEKFIX Jobs?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to connecting the right people with the right opportunities in the technology sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-2">
                <Search className="h-8 w-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Find jobs that match your skills and preferences with our advanced filtering system and AI-powered recommendations.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-2">
                <Users className="h-8 w-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top Talent</h3>
              <p className="text-gray-600 leading-relaxed">
                Access to skilled professionals across various tech industries and expertise levels, from junior to senior positions.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-2">
                <Building className="h-8 w-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Companies</h3>
              <p className="text-gray-600 leading-relaxed">
                Partner with reputable tech companies that value innovation, professional growth, and work-life balance.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-2">
                <TrendingUp className="h-8 w-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Career Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Opportunities for professional development, skill enhancement, and career advancement in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">50K+</div>
              <div className="text-gray-600">Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1K+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-indigo-900/95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform. Start your journey today.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Sign Up as Job Seeker
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="bg-transparent text-white px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold text-lg border-2 border-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Post Jobs as Employer
                <Building className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;