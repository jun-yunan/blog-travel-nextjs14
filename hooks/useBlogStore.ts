import { create } from 'zustand';

interface WriteBlog {
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
}

type BlogStore = {
  openDialogPublish: boolean;
  openDialogDraft: boolean;
  writeBlog: WriteBlog;
  setOpenDialogPublish: (open: boolean) => void;
  setOpenDialogDraft: (open: boolean) => void;
  setWriteBlog: (writeBlog: WriteBlog) => void;
};

export const useBlogStore = create<BlogStore>((set) => ({
  openDialogPublish: false,
  openDialogDraft: false,
  writeBlog: {
    title: '',
    content: '',
    tags: [],
    published: false,
  },
  setOpenDialogPublish: (open) => set({ openDialogPublish: open }),
  setOpenDialogDraft: (open) => set({ openDialogDraft: open }),
  setWriteBlog: (writeBlog: WriteBlog) =>
    set((state) => ({ writeBlog: { ...state.writeBlog, ...writeBlog } })),
}));
