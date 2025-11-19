import {
  CaseSensitive,
  ChartNoAxesColumnIncreasing,
  Heart,
  MessageCircleMore,
} from "lucide-react";
import { Card, CardContent, CardFooter, Separator } from "../ui";
import { UserInfo } from "./user-info";

function NewTopic() {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex items-center">
        <div className="flex flex-col justify-between gap-3">
          <div>
            <CaseSensitive color={"lightgray"} />
            <p className="text-lg font-semibold line-clamp-2">
              CEO의 다이어리 CEO의 다이어리 CEO의 다이어리 CEO의 다이어리 CEO의
              다이어리 CEO의 다이어리 CEO의 다이어리 CEO의 다이어리
            </p>
          </div>
          <p className="line-clamp-3 text-neutral-400">
            'CEO의 다이어리'라는 책을 구매한 이유는 도입부의 어느 구절이 내가
            현재 걸어가고 있는 길과 비슷했기 때문이다. 이 책은 크게 4개의 파트로
            나뉘어 있다. 가고 있는 길과 비슷했기 때문이다. 이 책은 크게 4개의
            파트로 나뉘어 있다.
          </p>
        </div>

        {/* 이미지 */}
        <img src="/public/vite.svg" alt="" className="h-35" />
      </CardContent>

      <div className="px-6">
        <Separator />
      </div>

      <CardFooter className="flex items-end justify-between">
        {/* 유저 정보 */}
        <UserInfo />

        {/* 반응? */}
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
