import { Job } from '../types';

// Mock data for demo purposes
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for developing and maintaining our web applications using React, TypeScript, and modern frontend technologies.',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'full-time',
    requirements: 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience with React, TypeScript, and modern frontend frameworks. Experience with state management libraries like Redux or Context API.',
    benefits: 'Health insurance, 401k matching, flexible work hours, remote work options, professional development budget.',
    postedBy: '2',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Backend Developer',
    description: 'Join our backend team to build scalable APIs and microservices. Experience with Node.js, Express, and MongoDB required.',
    company: 'StartupHub',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    type: 'full-time',
    requirements: '3+ years of experience with Node.js and Express. Experience with MongoDB or other NoSQL databases. Knowledge of RESTful API design and microservices architecture.',
    benefits: 'Competitive salary, stock options, health insurance, unlimited PTO.',
    postedBy: '2',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    description: 'Create beautiful and intuitive user interfaces. Experience with Figma, Adobe Creative Suite, and user research methodologies preferred.',
    company: 'DesignStudio',
    location: 'Remote',
    salary: '$70,000 - $95,000',
    type: 'contract',
    requirements: 'Bachelor\'s degree in Design or related field. 2+ years of experience in UI/UX design. Proficiency in Figma, Sketch, or Adobe XD. Portfolio demonstrating design thinking and problem-solving skills.',
    benefits: 'Flexible schedule, remote work, creative freedom, design tool subscriptions.',
    postedBy: '2',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

class JobService {
  async getJobs(): Promise<Job[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockJobs]);
      }, 300);
    });
  }

  async getJobById(id: string): Promise<Job | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const job = mockJobs.find(j => j.id === id);
        resolve(job || null);
      }, 300);
    });
  }

  async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newJob: Job = {
          ...jobData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockJobs.unshift(newJob);
        resolve(newJob);
      }, 300);
    });
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const jobIndex = mockJobs.findIndex(j => j.id === id);
        if (jobIndex === -1) {
          reject(new Error('Job not found'));
          return;
        }

        const updatedJob = {
          ...mockJobs[jobIndex],
          ...jobData,
          updatedAt: new Date().toISOString()
        };
        
        mockJobs[jobIndex] = updatedJob;
        resolve(updatedJob);
      }, 300);
    });
  }

  async deleteJob(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const jobIndex = mockJobs.findIndex(j => j.id === id);
        if (jobIndex === -1) {
          reject(new Error('Job not found'));
          return;
        }

        mockJobs.splice(jobIndex, 1);
        resolve();
      }, 300);
    });
  }
}

export const jobService = new JobService();