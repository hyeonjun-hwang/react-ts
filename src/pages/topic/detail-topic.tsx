// 우리가 필요한 정보
// - title: 제목
// - created_at: 작성일
// - content: 내용
// - thumbnail: 썸네일
// - category: 카테고리
import { useState, useEffect } from "react";

import supabase from "@/utils/supabase";

import { useNavigate, useParams } from "react-router";

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Spinner,
} from "@/components/ui";
import { ArrowLeft, Trash2, UserPlus, UserSearch } from "lucide-react";
import { TopicContentViewer } from "@/components/common";
import { UserInfo } from "@/components/topic";

function DetailTopic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // supabase에서 해당 토픽 가져오기 (url 파라미터 id로 매핑)
    const fetchTopic = async () => {
      // id일치하는 topic 데이터 가져오기
      const { data, error } = await supabase
        .from("topics")
        .select("*")
        .eq("id", id);

      // 에러처리
      if (error) {
        console.log("error :", error);
        throw error;
      }

      // 없는 id 페이지 진입시 홈으로 랜딩
      if (!data.length) {
        navigate("/");
      }

      setTopic(data[0]);

      setIsLoading(false);

      // (임시) 확인용
      console.log("data :", data);
      console.log("data[0] :", data[0]);
    };

    fetchTopic();
  }, []);

  console.log("topic: ", topic);

  // useEffect 돌기 전 로딩화면 처리
  if (isLoading)
    return (
      <div className="flex items-center">
        <Spinner />
      </div>
    );

  return (
    <main className="w-full max-w-[1328px] h-full flex flex-col justify-start gap-2 pb-6">
      {/* 상단 영역 */}
      <div
        className="relative h-100 bg-cover bg-position-[50%_50%]"
        style={{
          backgroundImage: `url(${topic.thumbnail})`,
        }}
      >
        <div className="relative z-1 flex flex-col gap-6">
          {/* 좌상단 버튼 그룹 */}
          <div className="flex items-center gap-2 mt-6">
            {/* 뒤로 가기 */}
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowLeft />
            </Button>
            {/* 삭제 */}
            <Button variant={"outline"} size={"icon"}>
              <Trash2 />
            </Button>
          </div>

          {/* 타이틀 영역 */}
          <div className="flex flex-col items-center gap-6 mt-28">
            {/* 카테고리 */}
            <span>{topic.category}</span>
            {/* 제목 */}
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
              {topic.title}
            </h1>
            <Separator className="w-6! bg-white" />
            {/* 작성일 */}
            <span>{new Date(topic.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* 그라데이션 */}
        <div className="absolute inset-0 bg-linear-to-r from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-l from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
      </div>

      {/* 본문 영역 */}
      <div className="relative flex gap-6">
        {/* content 부분 */}
        <div className="flex flex-col flex-3/4 gap-6">
          {/* <div>{topic.content}</div> */}
          <TopicContentViewer content={JSON.parse(topic.content)} />
          <div>(조회수, 좋아요 영역)</div>
          <div>(댓글 영역)</div>
        </div>

        {/* 작성자 정보 */}
        <Card className="sticky top-12 w-full h-fit flex-1/4">
          {/* <CardHeader className="w-fit">
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader> */}
          <CardContent className="flex flex-col gap-4">
            <UserInfo />
            <p className="text-xs text-neutral-400">팔로우 0명</p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button className="flex-1 cursor-pointer" variant={"secondary"}>
              <UserPlus />
              팔로우
            </Button>
            <Button className="flex-1 cursor-pointer" variant={"secondary"}>
              <UserSearch />
              프로필
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export { DetailTopic };
