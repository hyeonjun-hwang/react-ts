import { Card, CardContent, CardFooter } from "../ui";
import { UserInfo } from "./user-info";
import type { Topic } from "@/types/topic";
interface Props {
  topic: Topic;
}

function HotTopic({ topic }: Props) {
  return (
    <div>
      <Card className="min-w-70 flex flex-col">
        <CardContent className="relative flex justify-center">
          {/* 이미지 */}
          <img src="/public/vite.svg" alt="" className="w-full" />

          {/* 제목 */}
          <div className="p-3 absolute bottom-0 flex flex-col justify-between gap-3">
            <p className="text-lg font-semibold line-clamp-2 z-1 text-neutral-200">
              CEO의 다이어리 CEO의 다이어리 CEO의 다이어리 CEO의 다이어리 CEO의
              다이어리 CEO의 다이어리 CEO의 다이어리 CEO의 다이어리
            </p>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent rounded-b-lg"></div>
        </CardContent>

        <CardFooter className="flex items-end justify-between">
          {/* 유저 정보 */}
          <UserInfo profile={topic.profiles} />
        </CardFooter>
      </Card>
    </div>
  );
}

export { HotTopic };
