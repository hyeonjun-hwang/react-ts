import { useEffect } from "react";
import supabase from "@/utils/supabase";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import type { Session } from "@/types/session";

function AuthListener() {
  // store에서 상태 변경 함수 가져오기
  const { setSession, setProfile, setIsLoading } = useUserStore();

  useEffect(() => {
    // profiles 데이터 가져오는 함수
    const fetchProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId) // user_id로 조회
          .single();

        if (error) {
          toast.error(error.message);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error("profiles 데이터 조회 중 에러 :", error);
      }
    };

    // session, profiles 처리 로직
    const handleSession = async (session: Session | null) => {
      // 가져온 session store에 상태 업데이트
      setSession(session);

      // 유저 정보 있으면 profiles 가져오고 아니면 초기화
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      // 세션 업데이트 했으니 로딩 상태 false로 변경 (이걸로 토픽 생성 페이지 접근 제한?)
      setIsLoading(false);
    };

    // LocalStorage에서 토큰을 읽고, 유효하면 서버와 통신하여 최신 세션 정보를 가져옴
    supabase.auth.getSession().then(({ data: { session } }) => {
      // 가져온 session 업데이트
      handleSession(session);

      // 이후 발생하는 auth events(로그인, 로그아웃, 토큰 자동 갱신 등) 실시간으로 감지
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        // auth events 발생했으니 새로운 session, profile 정보로 상태 업데이트
        handleSession(session);
      });

      // 클린업 함수 (컴포넌트 언마운트 시 실행)
      return () => {
        // 메모리 누수를 방지하기 위해 실시간 구독을 해제(unsubscribe)
        data.subscription.unsubscribe();
      };
    });
  }, [setSession, setProfile, setIsLoading]);

  // 이 컴포넌트는 UI는 없고 상태 관리만 하므로 null 반환
  return null;
}

export { AuthListener };
