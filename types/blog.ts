interface Author {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
  author: Author;
  content: string;
  tags: string[];
  comments: unknown[];
  createdAt: Date;
  updatedAt: Date;
}
