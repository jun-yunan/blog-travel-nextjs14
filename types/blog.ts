import { Comment } from './comment';
import { Like } from './like';
import { Share } from './share';

export interface Author {
  _id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  personalWebsite: string;
  createdAt: Date;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
  author: Author;
  content: string;
  tags: string[];
  comments: Comment[];
  likes: Like[];
  shares: Share[];
  createdAt: Date;
  updatedAt: Date;
}
