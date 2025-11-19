import { BadgeCheck } from "lucide-react";
import { Separator } from "../ui";

function UserInfo() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <BadgeCheck size={20} className="text-green-500" />
        <p>Card Footer</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <p>IT 및 기술 분야</p>
        <Separator orientation="vertical" className="h-3!" />
        <p>소프트웨어 엔지니어</p>
      </div>
    </div>
  );
}

export { UserInfo };
