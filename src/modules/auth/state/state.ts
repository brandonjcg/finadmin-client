import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserDef {
  _id: string;
  email: string;
  fullName: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthStateDef {
  user: UserDef | null | string;
  setUser: (data: UserDef) => void;
  removeUser: () => void;
}

export interface ZustandState {
  state: {
    user: UserDef;
  };
}

export const useAuthState = create(
  persist<AuthStateDef>(
    (set) => ({
      user: null,
      setUser: (user: UserDef) => {
        set({ user });
      },
      removeUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
