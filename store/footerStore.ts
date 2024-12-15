import { create } from 'zustand';

interface FooterStore {
  isFooterVisible: boolean;
  setFooterVisible: (isVisible: boolean) => void;
}

const useFooterStore = create<FooterStore>((set) => ({
  isFooterVisible: false,
  setFooterVisible: (isVisible) => set({ isFooterVisible: isVisible }),
}));

export default useFooterStore;
