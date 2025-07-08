import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJob } from '../contexts/JobContext';
import { Link } from 'react-router-dom';
import JobCard from '../components/Jobs/JobCard';
import JobForm from '../components/Jobs/JobForm';
import { Job } from '../types';
import { PlusCircle, Briefcase } from 'lucide-react';

const EmployerJobs: React.FC = () => {
  const { user } = useAuth();
  const { jobs, updateJob, deleteJob } = useJob();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userJobs = jobs.filter(job => job.postedBy === user?.id);

  const handleEdit = (job: Job) => {
    setEditingJob(job);
  };

  const handleDelete = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobId);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleUpdate = async (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingJob) return;

    setIsLoading(true);
    try {
      await updateJob(editingJob.id, jobData);
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Job Postings</h1>
            <p className="text-gray-600">
              Manage your job postings and track applications
            </p>
          </div>
          <Link
            to="/create-job"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Post New Job</span>
          </Link>
        </div>

        {editingJob && (
          <div className="mb-8">
            <JobForm
              job={editingJob}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              isLoading={isLoading}
            />
          </div>
        )}

        {userJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
            <p className="text-gray-600 mb-4">
              Start attracting top talent by posting your first job opportunity.
            </p>
            <Link
              to="/create-job"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;