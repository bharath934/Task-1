import React, { useState } from 'react';
import { useJob } from '../contexts/JobContext';
import { useAuth } from '../contexts/AuthContext';
import JobCard from '../components/Jobs/JobCard';
import JobFilters from '../components/Jobs/JobFilters';
import { Briefcase, CheckCircle } from 'lucide-react';

const JobListings: React.FC = () => {
  const { user } = useAuth();
  const {
    isLoading,
    searchTerm,
    locationFilter,
    typeFilter,
    setSearchTerm,
    setLocationFilter,
    setTypeFilter,
    getFilteredJobs
  } = useJob();

  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const filteredJobs = getFilteredJobs();

  const handleApply = (jobId: string) => {
    // Simulate job application
    setAppliedJobs(prev => new Set([...prev, jobId]));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header Section with Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Dream Job
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore thousands of opportunities from top companies in the tech industry
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Application submitted successfully!</span>
          </div>
        )}

        <JobFilters
          searchTerm={searchTerm}
          locationFilter={locationFilter}
          typeFilter={typeFilter}
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationFilter}
          onTypeChange={setTypeFilter}
        />

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 font-medium">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
          </p>
          {user?.role === 'seeker' && appliedJobs.size > 0 && (
            <p className="text-blue-600 font-medium">
              Applied to {appliedJobs.size} job{appliedJobs.size !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No jobs found</h3>
              <p className="text-gray-600 leading-relaxed">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="relative">
                <JobCard 
                  job={job} 
                  onApply={user?.role === 'seeker' ? handleApply : undefined}
                />
                {appliedJobs.has(job.id) && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Applied
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;