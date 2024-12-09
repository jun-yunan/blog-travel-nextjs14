import { User } from '@/types/user';
import { create } from 'zustand';

type UserStore = {
  user: User | null;
  userId: string | null;
  openDialogUploadImage: boolean;
  setUser: (user: User | null) => void;
  setOpenDialogUploadImage: (open: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userId: null,
  openDialogUploadImage: false,
  setUserId: (userId: string | null) => set({ userId }),
  setUser: (user) => set({ user }),
  setOpenDialogUploadImage: (open) => set({ openDialogUploadImage: open }),
}));
