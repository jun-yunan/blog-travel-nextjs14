import { Blog } from './blog';
import { User } from './user';

export interface Like {
  _id: string;
  liked: boolean;
  user: User;
  blog: Blog;
  createdAt: Date;
  updatedAt: Date;
}
