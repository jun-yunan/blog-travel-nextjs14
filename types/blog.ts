export interface Blog {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
  author: string;
  content: string;
  tags: string[];
  comments: unknown[];
  createdAt: Date;
  updatedAt: Date;
}
