import supabase from "@/utils/supabase";
import { create } from "zustand";

import type { Session } from "@/types/session";

interface UserState {
  session: Session | null;
  isLoading: boolean;
  setSession: (sessionData: Session | null) => void;
  setIsLoading: (loadingState: boolean) => void;
  logout: () => Promise<void>;
}

// 유저 데이터 관리
const useUserStore = create<UserState>((set) => ({
  // 로그인하면 받는 세션 데이터
  session: null,
  isLoading: true,

  setSession: (sessionData) => {
    set({
      session: sessionData,
      isLoading: false,
    });
  },

  setIsLoading: (loadingState) => {
    set({ isLoading: loadingState });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, isLoading: false });
  },
}));

export { useUserStore };
