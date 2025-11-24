import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button, Input, Skeleton } from "./components/ui";
import {
  HotTopic,
  NewTopic,
  TopicAddButton,
  TopicCategory,
} from "./components/topic";
import supabase from "./utils/supabase";

function App() {
  // supabase에서 발행 상태인 topic 가져오기
  const [topics, setTopics] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchTopics = async () => {
      setIsFetching(true);
      let { data: topics, error } = await supabase
        .from("topics")
        .select("*")
        .eq("status", "PUBLISH");

      // console.log("topics:", topics);

      if (topics) {
        setIsFetching(false);
        setTopics(topics);
      }

      if (error) {
        setIsFetching(false);
        throw error;
      }
    };
    fetchTopics();
  }, []);

  // auth 데이터 (유저 정보)
  // 작업 예정...

  return (
    <div className="w-full max-w-[1328px] h-full flex items-start justify-start mt-6 gap-6">
      {/* 메뉴바 */}
      <TopicCategory />

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col min-w-0 gap-10">
        {/* 타이틀 및 검색 */}
        <section className="pt-4 flex flex-col items-center gap-4">
          {/* 타이틀 */}
          <div className="flex flex-col items-center text-lg font-semibold">
            <div className="flex items-center gap-1">
              <img src="/public/gifs/heart-fire.gif" alt="" className="w-5" />
              <p>지식과 인사이트를 모아,</p>
            </div>
            <p>토픽으로 깊이 있게 나누세요!</p>
          </div>

          {/* 검색 */}
          <div className="relative w-full max-w-lg flex items-center gap-2">
            <Search className="absolute left-4" color="lightgray" size={18} />
            <Input
              className="px-11 py-6 rounded-full"
              placeholder="관심 있는 클래스, 토픽"
            ></Input>
            <Button
              className="w-fit h-7 absolute right-3 rounded-full"
              variant={"outline"}
            >
              검색
            </Button>
          </div>
        </section>

        {/* HOT 토픽 */}
        <section className="flex flex-col gap-6">
          {/* 타이틀 및 디스크립션 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src="/gifs/writing-hand.gif" alt="" className="w-6" />
              <p className="text-2xl">HOT 토픽</p>
            </div>
            <p className="text-lg text-neutral-400">
              지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를
              얻어보세요.
            </p>
          </div>

          {/* 카드 영역 */}
          <div className="flex gap-6 overflow-x-auto flex-nowrap scroll-hidden">
            <HotTopic />
            <HotTopic />
            <HotTopic />
            <HotTopic />
            <HotTopic />
            <HotTopic />
          </div>
        </section>

        {/* NEW 토픽 */}
        <section className="flex flex-col gap-6">
          {/* 타이틀 및 디스크립션 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src="/gifs/writing-hand.gif" alt="" className="w-6" />
              <p className="text-2xl">NEW 토픽</p>
            </div>
            <p className="text-lg text-neutral-400">
              새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의
              토픽을 작성해보세요.
            </p>
          </div>

          {/* 카드 영역 */}
          <div className="grid grid-cols-2 gap-6">
            {!isFetching ? (
              topics.map((topic, i) => <NewTopic key={i} topic={topic} />)
            ) : (
              <Skeleton className="h-[300px]" />
            )}
          </div>
        </section>
      </div>

      {/* 토픽 추가 플로팅 버튼 */}
      <TopicAddButton />
    </div>
  );
}
export { App };
