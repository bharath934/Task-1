import React from 'react';
import { Job } from '../../types';
import { MapPin, Calendar, Building, DollarSign, Clock, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface JobCardProps {
  job: Job;
  showActions?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
  onApply?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, showActions = false, onEdit, onDelete, onApply }) => {
  const { user } = useAuth();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'part-time':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'internship':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'Full Time';
      case 'part-time':
        return 'Part Time';
      case 'contract':
        return 'Contract';
      case 'internship':
        return 'Internship';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-semibold">{job.company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(job.type)}`}>
            <Briefcase className="h-3 w-3 mr-1" />
            {getTypeLabel(job.type)}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{job.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-purple-500" />
          <span>Posted {formatDate(job.createdAt)}</span>
        </div>
        {job.salary && (
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-green-500" />
            <span className="font-semibold text-green-600">{job.salary}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {showActions && (
          <>
            <button
              onClick={() => onEdit?.(job)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(job.id)}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Delete
            </button>
          </>
        )}
        
        {user?.role === 'seeker' && !showActions && (
          <button
            onClick={() => onApply?.(job.id)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
