import { create } from "zustand";
import supabase from "@/utils/supabase";
import type { Topic } from "@/types/topic";

interface TopicState {
  topics: Topic[];
  isLoading: boolean;
  error: string | null;
  
  fetchTopics: (category?: string, searchQuery?: string) => Promise<void>;
  setTopics: (topics: Topic[]) => void;
}

export const useTopicStore = create<TopicState>((set) => ({
  topics: [],
  isLoading: false,
  error: null,

  setTopics: (topics) => set({ topics }),

  fetchTopics: async (category = "all", searchQuery = "") => {
    set({ isLoading: true, error: null });
    
    try {
      // 기본적으로 가져오는 발행된 전체 topic 리스트 (created_at 기준 내림차순)
      let query = supabase
        .from("topics")
        .select(`*, profiles(*)`)
        .eq("status", "PUBLISH")
        .order("created_at", { ascending: false });

      // 카테고리가 '전체'가 아니면 카테고리 필터링 조건
      if (category !== "all") {
        query = query.eq("category", category);
      }

      // 검색어가 title에 포함된 토픽 필터링 조건
      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      // supabase에 필터링 적용된 조회 쿼리 날리기
      const { data, error } = await query;

      if (error) throw error;

      set({ topics: data || [], isLoading: false });
    }
    catch (error : any) {
      console.error("topic 조회 실패:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));