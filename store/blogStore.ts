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
  openDialogDelete: boolean;
  openDropdownMenu: boolean;
  openSheetComments?: boolean;
  setOpenSheetComments: (open: boolean) => void;
  setOpenDropdownMenu: (open: boolean) => void;
  setOpenDialogDelete: (open: boolean) => void;
  setOpenDialogPublish: (open: boolean) => void;
  setOpenDialogDraft: (open: boolean) => void;
  setWriteBlog: (writeBlog: WriteBlog) => void;
};

export const blogStore = create<BlogStore>((set) => ({
  openDialogPublish: false,
  openDialogDraft: false,
  openDialogDelete: false,
  openDropdownMenu: false,
  openSheetComments: false,
  writeBlog: {
    title: '',
    content: '',
    tags: [],
    published: false,
  },
  setOpenSheetComments: (open) => set({ openSheetComments: open }),
  setOpenDialogPublish: (open) => set({ openDialogPublish: open }),
  setOpenDialogDraft: (open) => set({ openDialogDraft: open }),
  setWriteBlog: (writeBlog: WriteBlog) =>
    set((state) => ({ writeBlog: { ...state.writeBlog, ...writeBlog } })),
  setOpenDialogDelete: (open) => set({ openDialogDelete: open }),
  setOpenDropdownMenu: (open) => set({ openDropdownMenu: open }),
}));
