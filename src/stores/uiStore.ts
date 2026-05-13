import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalType: string | null;
  toggleSidebar: () => void;
  openModal: (type: string) => void;
  closeModal: () => void;
  setModalType: (type: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  modalOpen: false,
  modalType: null,
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (type) =>
    set({ modalOpen: true, modalType: type }),
  closeModal: () =>
    set({ modalOpen: false, modalType: null }),
  setModalType: (type) =>
    set({ modalType: type }),
}));