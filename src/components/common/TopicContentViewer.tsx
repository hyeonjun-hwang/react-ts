import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "../theme-provider";

function TopicContentViewer({ content }) {
  const { theme } = useTheme();
  const blocknoteTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const editor = useCreateBlockNote({
    initialContent: content,
  });

  console.log("content: ", content);
  return (
    <BlockNoteView editor={editor} theme={blocknoteTheme} editable={false} />
  );
}

export { TopicContentViewer };
