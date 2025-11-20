import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import { ko } from "@blocknote/core/locales";

import { useTheme } from "../theme-provider";

function AppTextEditor() {
  // blocknote 테마에 shadcn 다크모드 테마 적용
  const { theme } = useTheme();
  const blocknoteTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // 스타일 수정

  // Create a new editor instance
  const editor = useCreateBlockNote({ dictionary: ko });

  // Render the editor
  return <BlockNoteView editor={editor} theme={blocknoteTheme} />;
}

export { AppTextEditor };
