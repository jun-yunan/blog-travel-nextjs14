import { Comment } from './comment';
import { Like } from './like';
import { Share } from './share';
import { User } from './user';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  author: User;
  content: string;
  tags: string[];
  comments: Comment[];
  likes: Like[];
  shares: Share[];
  createdAt: Date;
  updatedAt: Date;
}
