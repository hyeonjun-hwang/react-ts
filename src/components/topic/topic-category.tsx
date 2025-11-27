import {
  ChartNoAxesCombined,
  ChevronDown,
  CodeXml,
  DraftingCompass,
  Footprints,
  Goal,
  Lightbulb,
  List,
  Rocket,
} from "lucide-react";
import { Button } from "../ui";

const CATEGORIES = [
  { icon: List, label: "전체", value: "all" },
  { icon: Lightbulb, label: "인문학", value: "humidity" },
  { icon: Rocket, label: "스타트업", value: "start-up" },
  {
    icon: CodeXml,
    label: "IT·프로그래밍",
    value: "programming",
  },
  { icon: Goal, label: "서비스·전략 기획", value: "planning" },
  {
    icon: ChartNoAxesCombined,
    label: "마케팅",
    value: "marketing",
  },
  {
    icon: DraftingCompass,
    label: "디자인·일러스트",
    value: "design",
  },
  {
    icon: Footprints,
    label: "자기계발",
    value: "self-development",
  },
];

interface Props {
  onHandleCategoryChange: (value: string) => void;
  categoryValue: string;
}

function TopicCategory({ onHandleCategoryChange, categoryValue }: Props) {
  return (
    <aside className="w-60 min-w-60 flex flex-col gap-8 sticky top-18">
      <div className="flex items-center justify-start gap-1">
        <p className="text-2xl">카테고리</p>
        <ChevronDown size={30} />
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((item, i) => {
          const IconComp = item.icon;
          const isActive = item.value === categoryValue;

          return (
            <div
              key={i}
              className={`flex gap-2 text-neutral-400 hover:pl-4 duration-700 ${
                isActive && "text-neutral-900 dark:text-neutral-100 pl-4"
              }`}
              onClick={() => {
                onHandleCategoryChange(item.value);
              }}
            >
              <Button
                variant={"ghost"}
                className="w-full flex items-center justify-start cursor-pointer"
              >
                <IconComp />
                {item.label}
              </Button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export { TopicCategory };
