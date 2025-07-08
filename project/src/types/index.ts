export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employer' | 'seeker';
  company?: string;
  designation?: string;
  education?: string;
  qualification?: string;
  experience?: 'fresher' | 'experienced';
  resumeUrl?: string;
  phone?: string;
  location?: string;
  bio?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  requirements?: string;
  benefits?: string;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface JobState {
  jobs: Job[];
  isLoading: boolean;
  searchTerm: string;
  locationFilter: string;
  typeFilter: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  company?: string;
  designation?: string;
  education?: string;
  qualification?: string;
  experience?: 'fresher' | 'experienced';
  resumeUrl?: string;
}