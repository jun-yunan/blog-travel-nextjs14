import { Blog } from './blog';
import { User } from './user';

export interface Share {
  id: string;
  shared: boolean;
  user: User;
  blog: Blog;
  createdAt: Date;
  updatedAt: Date;
}
