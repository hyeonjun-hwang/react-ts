import {
  CaseSensitive,
  ChartNoAxesColumnIncreasing,
  Heart,
  MessageCircleMore,
} from "lucide-react";
import { Card, CardContent, CardFooter, Separator } from "../ui";
import { UserInfo } from "./user-info";
import { useNavigate } from "react-router";

// 텍스트 에디터의 콘텐츠 부분 텍스트 추출용
function extractTextFromContent(topic) {
  // content 없으면 빈값 반환
  if (!topic?.content) return "";

  // 스트링으로된 topic content를 배열로 변경
  const parse = JSON.parse(topic.content);

  // console.log("parse: ", parse); // parse 구성 확인용

  // blocknote에 텍스트 부분만 추출해서 연결
  let result = "";
  for (const block of parse) {
    if (block.content && Array.isArray(block.content)) {
      for (const content of block.content) {
        result += content.text;
      }
    }
    //  block 하나 끝나면 줄바꿈 추가
    result += " ";
  }
  return result;
}

function NewTopic({ topic }) {
  const navigate = useNavigate();
  return (
    <Card
      className="flex flex-col cursor-pointer"
      onClick={() => {
        navigate(`/topic/${topic.id}`);
      }}
    >
      <CardContent className="flex items-center justify-between gap-3">
        <div className="flex flex-col justify-between gap-3">
          <div>
            <CaseSensitive color={"lightgray"} />
            <p className="text-lg font-semibold line-clamp-2">{topic.title}</p>
          </div>
          <p className="line-clamp-3 text-neutral-400">
            {extractTextFromContent(topic)}
          </p>
        </div>

        {/* 이미지 */}
        <img src={topic.thumbnail} alt="" className="h-35 rounded-sm" />
      </CardContent>

      <div className="px-6">
        <Separator />
      </div>

      <CardFooter className="flex items-end justify-between">
        {/* 유저 정보 */}
        <UserInfo />

        {/* 조회수, 댓글수, 좋아요수 */}
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <ChartNoAxesColumnIncreasing size={18} />
            <p>24</p>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircleMore size={18} />
            <p>24</p>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={18} className="text-red-500" />
            <p>24</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export { NewTopic };
