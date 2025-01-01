import { create } from "zustand";
import { AuthStorage } from "../lib/local-storage";
import { IUser } from "../types/user-type";

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  userRole: "admin" | "user";
  login: (user: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set: (partial: Partial<AuthState>) => void) => ({
  isAuthenticated: !!AuthStorage.getAccessToken() || false,
  user: null,
  userRole: "user",
  isAdmin: true,
  login: (user: IUser) =>
    set({
      isAuthenticated: true,
      user,
      userRole: user?.role,
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
