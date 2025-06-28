import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogged: false,

  login: () => set({ isLogged: true }),
  logout: () => set({ isLogged: false }),
}));

export default useAuthStore;