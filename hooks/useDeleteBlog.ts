import { Blog } from '@/types/blog';
import { create } from 'zustand';

interface DeleteBlog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: string;
  setBlogId: (blogId: string) => void;
}

export const useDeleteBlog = create<DeleteBlog>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
  blogId: '',
  setBlogId: (blogId) => set({ blogId }),
}));
