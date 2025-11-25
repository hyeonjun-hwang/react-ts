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

import type { Topic } from "./types/topic";

function App() {
  // 카테고리 변경 반영 로직
  const [categoryValue, setCategoryValue] = useState<string>("all");
  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
  };

  // console.log("categoryValue: ", categoryValue);

  // 검색 반영 로직
  const [inputValue, setSearchValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearch = () => {
    // 검색 클릭 또는 enter 칠때 그 inputValue로 필터링
    setSearchQuery(inputValue);
  };

  // inputValue 모두 지우면 검색 필터링 해제
  useEffect(() => {
    if (inputValue === "") {
      setSearchQuery("");
    }
  }, [inputValue]);

  // console.log("inputValue: ", inputValue);
  // console.log("searchQuery: ", searchQuery);

  // supabase에서 topic 가져오기
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isFetching, setIsFetching] = useState(false); // fetch중 상태
  const fetchTopics = async () => {
    setIsFetching(true);

    // 기본적으로 가져오는 발행된 전체 topic 리스트
    let query = supabase.from("topics").select("*").eq("status", "PUBLISH");

    // 카테고리가 '전체'가 아니면 카테고리 필터링 조건
    if (categoryValue !== "all") {
      query = query.eq("category", `${categoryValue}`);
    }

    // 검색어가 title에 포함된 토픽 필터링 조건
    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    // supabase에 요청
    let { data: topics, error } = await query;

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

  console.log("topics: ", topics);

  useEffect(() => {
    fetchTopics();
  }, [categoryValue, searchQuery]);

  // auth 데이터 (유저 정보)
  // 작업 예정...

  return (
    <div className="w-full max-w-[1328px] h-full flex items-start justify-start mt-6 gap-6">
      {/* 메뉴바 */}
      <TopicCategory
        onHandleCategoryChange={handleCategoryChange}
        categoryValue={categoryValue}
      />

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
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            ></Input>
            <Button
              className="w-fit h-7 absolute right-3 rounded-full"
              variant={"outline"}
              onClick={handleSearch}
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
            {/* {!isFetching ? (
              topics.map((topic, i) => <NewTopic key={i} topic={topic} />)
            ) : (
              <Skeleton className="h-[300px]" />
            )} */}
            {!isFetching ? (
              topics.length > 0 ? (
                topics.map((topic, i) => <NewTopic key={i} topic={topic} />)
              ) : (
                <p className="h-50 flex items-center justify-center col-span-2 text-center text-neutral-400">
                  토픽이 없습니다.
                </p>
              )
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
