import { create } from 'zustand';

interface UiState {
  isModalOpen: boolean;
  toggleModal: (value: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  isModalOpen: false,
  toggleModal: (value) => set(() => ({ isModalOpen: value })),
}));
