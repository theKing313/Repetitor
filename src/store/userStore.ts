// import { Product } from '@/types';
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | null;
}
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}


export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));