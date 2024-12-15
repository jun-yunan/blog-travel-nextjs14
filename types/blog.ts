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
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  content: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
}
