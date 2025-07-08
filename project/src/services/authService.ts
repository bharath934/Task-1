import { User, UserProfile } from '../types';

// Mock data for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@tekfix.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'TechCorp Employer',
    email: 'employer@techcorp.com',
    role: 'employer',
    company: 'TechCorp Solutions',
    designation: 'HR Manager',
    education: 'MBA in Human Resources',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced HR professional with 8+ years in tech recruitment.',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'John Seeker',
    email: 'john@example.com',
    role: 'seeker',
    qualification: 'Bachelor of Computer Science',
    experience: 'experienced',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    bio: 'Full-stack developer with 3 years of experience in React and Node.js.',
    resumeUrl: 'https://example.com/resume/john-seeker.pdf',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'seeker',
    qualification: 'Master of Computer Science',
    experience: 'fresher',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    bio: 'Recent graduate passionate about frontend development and UI/UX design.',
    resumeUrl: 'https://example.com/resume/sarah-johnson.pdf',
    createdAt: new Date().toISOString()
  }
];

class AuthService {
  private generateToken(user: User): string {
    // In a real app, this would use proper JWT signing
    return btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password') {
          const token = this.generateToken(user);
          resolve({ user, token });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: 'employer' | 'seeker',
    company?: string
  ): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          reject(new Error('User already exists'));
          return;
        }

        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role,
          company,
          createdAt: new Date().toISOString()
        };

        mockUsers.push(newUser);
        const token = this.generateToken(newUser);
        resolve({ user: newUser, token });
      }, 500);
    });
  }

  async getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]);
      }, 300);
    });
  }

  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        const updatedUser = {
          ...mockUsers[userIndex],
          ...profileData,
          updatedAt: new Date().toISOString()
        };
        
        mockUsers[userIndex] = updatedUser;
        resolve(updatedUser);
      }, 300);
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        resolve(user || null);
      }, 300);
    });
  }
}

export const authService = new AuthService();