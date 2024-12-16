import { Author, Blog } from './blog';

export interface Comment {
  _id: string;
  content: string;
  imageUrl: string;
  user: Author;
  blog: Blog;
  votes: number;
  likes: number;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
