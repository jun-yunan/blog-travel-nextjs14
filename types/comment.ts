// import { User } from '@prisma/client';
import { Blog } from './blog';
import { User } from './user';

export interface Comment {
  id: string;
  content: string;
  imageUrl: string;
  user: User;
  blog: Blog;
  votes: number;
  likes: number;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
