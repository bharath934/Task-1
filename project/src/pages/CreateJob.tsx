import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJob } from '../contexts/JobContext';
import JobForm from '../components/Jobs/JobForm';
import { Job } from '../types';

const CreateJob: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createJob } = useJob();
  const navigate = useNavigate();

  const handleSubmit = async (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      await createJob(jobData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">
            Create a compelling job posting to attract the best candidates
          </p>
        </div>

        <JobForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/dashboard')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateJob;