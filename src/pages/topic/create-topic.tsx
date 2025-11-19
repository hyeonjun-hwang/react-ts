import { useUserStore } from "@/store/userStore";
import { Navigate } from "react-router";
import { toast } from "sonner";

function CreateTopic() {
  const { session } = useUserStore();
  console.log("session에 머있나? :", session);

  if (!session) {
    toast.error("로그인 하고 오렴~");
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="w-full max-w-[1328px] h-full flex flex-col items-center justify-center gap-4 bg-yellow-600">
      <p className="text-2xl">토픽 생성 페이지</p>
      <p className="text-4xl">{`${session.user.email} 님 안녕하세요~`}</p>
    </div>
  );
}

export { CreateTopic };
