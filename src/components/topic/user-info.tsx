import { BadgeCheck } from "lucide-react";
import { Separator } from "../ui";

import type { Profile } from "@/types/profile";

interface Props {
  profile: Profile;
}

function UserInfo({ profile }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <BadgeCheck size={20} className="text-green-500" />
        <p>{profile?.nickname || "알 수 없음"}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <p>{profile?.sector || "알 수 없음"}</p>
        <Separator orientation="vertical" className="h-3!" />
        <p>{profile?.position || "알 수 없음"}</p>
      </div>
    </div>
  );
}

export { UserInfo };
