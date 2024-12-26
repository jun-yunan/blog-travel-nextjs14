import { create } from 'zustand';

interface Blog {
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
  variant?: 'write' | 'edit';
}

type BlogStore = {
  openDialogPublish: boolean;
  openDialogDraft: boolean;
  blog: Blog;
  openDialogDelete: boolean;
  openDropdownMenu: boolean;
  openSheetComments?: boolean;
  setBlog: (blog: Blog) => void;
  setOpenSheetComments: (open: boolean) => void;
  setOpenDropdownMenu: (open: boolean) => void;
  setOpenDialogDelete: (open: boolean) => void;
  setOpenDialogPublish: (open: boolean) => void;
  setOpenDialogDraft: (open: boolean) => void;
};

export const blogStore = create<BlogStore>((set) => ({
  openDialogPublish: false,
  openDialogDraft: false,
  openDialogDelete: false,
  openDropdownMenu: false,
  openSheetComments: false,
  blog: {
    title: '',
    content: '',
    tags: [],
    published: false,
    variant: 'write',
  },
  setOpenSheetComments: (open) => set({ openSheetComments: open }),
  setOpenDialogPublish: (open) => set({ openDialogPublish: open }),
  setOpenDialogDraft: (open) => set({ openDialogDraft: open }),
  setBlog: (blog: Blog) =>
    set((state) => ({ blog: { ...state.blog, ...blog } })),
  setOpenDialogDelete: (open) => set({ openDialogDelete: open }),
  setOpenDropdownMenu: (open) => set({ openDropdownMenu: open }),
}));
