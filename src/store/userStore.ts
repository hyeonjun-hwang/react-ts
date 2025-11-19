import { create } from "zustand";

// 유저 데이터 관리
const useUserStore = create((set) => ({
  // 로그인하면 받는 세션 데이터
  session: null,

  setSession: (session) => {
    set({
      session,
    });
  },

  setUser: () => {},
}));

export { useUserStore };
