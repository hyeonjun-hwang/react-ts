import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import { ko } from "@blocknote/core/locales";
import { useTheme } from "../theme-provider";

import { useEffect } from "react";

import type { Block } from "@blocknote/core";

interface Props {
  content: Block[];
  onSetContent?: (params: Block[]) => void;
  readonly?: boolean;
}

function AppTextEditor({ content, onSetContent, readonly }: Props) {
  // blocknote 테마에 shadcn 다크모드 테마 적용
  const { theme } = useTheme();
  const blocknoteTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // Create a new editor instance
  const editor = useCreateBlockNote({ dictionary: ko });

  // 만약 topic.content가 있으면 그 content로 변경해주는 로직
  useEffect(() => {
    if (content && content.length > 0) {
      editor.replaceBlocks(editor.document, content);
    }
  }, []);

  // Render the editor
  return (
    <BlockNoteView
      editor={editor}
      theme={blocknoteTheme}
      editable={readonly}
      onChange={() => {
        onSetContent?.(editor.document);
      }}
    />
  );
}

export { AppTextEditor };
