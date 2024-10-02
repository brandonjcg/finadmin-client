import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AuthStateDef {
  token: null | string;
  setToken: (data: string) => void;
  removeUser: () => void;
}

export interface ZustandState {
  state: {
    token: string | null;
  };
}

export const useAuthState = create(
  persist<AuthStateDef>(
    (set) => ({
      token: null,
      setToken: (token: string) => {
        set({ token });
      },
      removeUser: () => {
        set({ token: null });
      },
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
