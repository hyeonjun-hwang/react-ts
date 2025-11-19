import { PencilIcon } from "lucide-react";
import { Button } from "../ui";
import { useNavigate } from "react-router";

function TopicAddButton() {
  const navigate = useNavigate();

  return (
    <Button
      className="fixed bottom-10 left-1/2 -translate-x-1/2
    text-lg flex items-center gap-3 rounded-full px-9! py-7 cursor-pointer"
      onClick={() => {
        navigate("/create-topic");
      }}
    >
      <PencilIcon className="size-5" />
      <p>나만의 토픽 작성</p>
    </Button>
  );
}

export { TopicAddButton };
