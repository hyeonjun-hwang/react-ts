// 훅
import React, { useState, useRef } from "react";

// 컴포넌트
import { AppTextEditor } from "@/components/common";

// shadcn UI
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  Separator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { toast } from "sonner";

// 루시드 아이콘
import { Asterisk, Image, ImageOff } from "lucide-react";

// 스토어(zustand)
import { useUserStore } from "@/store/userStore";

// 라우터
import { Navigate } from "react-router";

function CreateTopic() {
  // (임시) 로그인 여부 검증
  const { session } = useUserStore();
  // console.log("session에 머있나? :", session);

  if (!session) {
    toast.error("로그인 하고 오렴~");
    return <Navigate to="/sign-in" />;
  }

  // topic 상태 관리
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState(null); // 텍스트 에디터에 담긴 데이터
  const [category, setCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);

  // 썸넬 이미지 file input 참조용
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 썸넬 이미지 setThumbnail 처리
  const handelChangeThumnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.files : ", e.target.files);
    // console.log("e.target.files[0] : ", e.target.files[0]);
    // console.log("e.target.value : ", e.target.value);

    setThumbnail(e.target.files?.[0] ?? null);

    e.target.value = "";
  };

  // console.log("thumbnail : ", thumbnail);

  // 썸넬 이미지 등록 및 미리보기 처리
  const handleThumnailPreview = () => {
    if (typeof thumbnail === "string") {
      // thumbnail이 url 인 경우
      return (
        <div className="w-full aspect-video flex items-center justify-center border rounded-lg">
          <img src={thumbnail} alt="" />
        </div>
      );
    } else if (thumbnail instanceof File) {
      // thumbnail이 file 인 경우
      return (
        <img
          src={URL.createObjectURL(thumbnail)}
          alt=""
          className="w-full aspect-video border rounded-lg object-cover"
        />
      );
    }

    // thumbnail이 null 인 경우 -> 이미지 등록 화면 노출
    return (
      <div className="w-full aspect-video flex items-center justify-center border rounded-lg">
        <Button
          variant={"ghost"}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <Image className="size-7" />
        </Button>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handelChangeThumnail}
        ></Input>
      </div>
    );
  };

  return (
    <main className="w-full max-w-[1328px] h-full flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-[1328px] h-full flex gap-6 py-6">
        {/* STEP 01 */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="font-medium text-orange-500">Step 1</p>
            <p className="font-semibold text-base">토픽 작성하기</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* 제목 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Asterisk size={14} className="text-orange-500" />
                <p className="text-neutral-500 text-base">제목</p>
              </div>
              <Input
                placeholder="토픽 제목을 입력하세요."
                className="h-12 placeholder:text-sm placeholder:font-semibold text-lg! font-semibold px-5"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            {/* 본문 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Asterisk size={14} className="text-orange-500" />
                <p className="text-neutral-500 text-base">본문</p>
              </div>

              {/* Blocknote 텍스트 에디터 UI */}
              <div className="w-full h-screen">
                <AppTextEditor />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="w-[314px] min-w-[314px] flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="font-medium text-orange-500">Step 2</p>
            <p className="font-semibold text-base">카테고리 및 썸네일 등록</p>
          </div>
          <div className="flex flex-col gap-6">
            {/* 카테고리 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Asterisk size={14} className="text-orange-500" />
                <p className="text-neutral-500 text-base">카테고리</p>
              </div>

              {/* 셀렉 박스 */}
              <Select
                onValueChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                <SelectTrigger className="w-full h-12!">
                  <SelectValue
                    placeholder="토픽(주제) 선택"
                    className="text-base"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>카테고리(주제)</SelectLabel>
                    <SelectItem value="humidity">인문학</SelectItem>
                    <SelectItem value="start-up">스타트업</SelectItem>
                    <SelectItem value="programming">
                      IT&middot;프로그래밍
                    </SelectItem>
                    <SelectItem value="planning">
                      서비스&middot;전략 기획
                    </SelectItem>
                    <SelectItem value="marketing">마케팅</SelectItem>
                    <SelectItem value="design">
                      디자인&middot;일러스트
                    </SelectItem>
                    <SelectItem value="self-development">자기계발</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* 썸넬 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Asterisk size={14} className="text-orange-500" />
                <p className="text-neutral-500 text-base">썸네일</p>
              </div>

              <div className="flex flex-col gap-2 ">
                {/* 썸넬 이미지 업로드 */}
                {handleThumnailPreview()}

                {/* 썸네일 제거 버튼 */}
                <Button variant={"outline"} onClick={() => setThumbnail(null)}>
                  <ImageOff />
                  썸네일 제거
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { CreateTopic };
