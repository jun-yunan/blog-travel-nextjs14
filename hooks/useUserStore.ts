import { User } from '@/types/user';
import { create } from 'zustand';

type UserStore = {
  user: User | null;
  userId: string | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userId: null,
  setUserId: (userId: string | null) => set({ userId }),
  setUser: (user) => set({ user }),
}));
