import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Job, JobState } from '../types';
import { jobService } from '../services/jobService';

interface JobContextType extends JobState {
  createJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  fetchJobs: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setLocationFilter: (location: string) => void;
  setTypeFilter: (type: string) => void;
  getFilteredJobs: () => Job[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

type JobAction = 
  | { type: 'FETCH_JOBS_START' }
  | { type: 'FETCH_JOBS_SUCCESS'; payload: Job[] }
  | { type: 'FETCH_JOBS_FAILURE' }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_LOCATION_FILTER'; payload: string }
  | { type: 'SET_TYPE_FILTER'; payload: string };

const jobReducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case 'FETCH_JOBS_START':
      return { ...state, isLoading: true };
    case 'FETCH_JOBS_SUCCESS':
      return { ...state, jobs: action.payload, isLoading: false };
    case 'FETCH_JOBS_FAILURE':
      return { ...state, isLoading: false };
    case 'ADD_JOB':
      return { ...state, jobs: [action.payload, ...state.jobs] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        )
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_LOCATION_FILTER':
      return { ...state, locationFilter: action.payload };
    case 'SET_TYPE_FILTER':
      return { ...state, typeFilter: action.payload };
    default:
      return state;
  }
};

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  searchTerm: '',
  locationFilter: '',
  typeFilter: ''
};

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    dispatch({ type: 'FETCH_JOBS_START' });
    try {
      const jobs = await jobService.getJobs();
      dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: jobs });
    } catch (error) {
      dispatch({ type: 'FETCH_JOBS_FAILURE' });
    }
  };

  const createJob = async (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const job = await jobService.createJob(jobData);
      dispatch({ type: 'ADD_JOB', payload: job });
    } catch (error) {
      throw error;
    }
  };

  const updateJob = async (id: string, jobData: Partial<Job>) => {
    try {
      const job = await jobService.updateJob(id, jobData);
      dispatch({ type: 'UPDATE_JOB', payload: job });
    } catch (error) {
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await jobService.deleteJob(id);
      dispatch({ type: 'DELETE_JOB', payload: id });
    } catch (error) {
      throw error;
    }
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setLocationFilter = (location: string) => {
    dispatch({ type: 'SET_LOCATION_FILTER', payload: location });
  };

  const setTypeFilter = (type: string) => {
    dispatch({ type: 'SET_TYPE_FILTER', payload: type });
  };

  const getFilteredJobs = () => {
    return state.jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(state.searchTerm.toLowerCase());
      
      const matchesLocation = !state.locationFilter || 
                            job.location.toLowerCase().includes(state.locationFilter.toLowerCase());
      
      const matchesType = !state.typeFilter || job.type === state.typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  };

  return (
    <JobContext.Provider value={{
      ...state,
      createJob,
      updateJob,
      deleteJob,
      fetchJobs,
      setSearchTerm,
      setLocationFilter,
      setTypeFilter,
      getFilteredJobs
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJob must be used within a JobProvider');
  }
  return context;
};