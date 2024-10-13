import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./index.module.scss";
import { forwardRef, useEffect, useState } from "react";
import clsx from "clsx";

// A rich text editor that follows Ant Design third-party form control conventions
const RichTextEditor = forwardRef(function RichTextEditor(
  {
    readonly = false,
    readonlyContent = "",
    value,
    onChange,
  }: {
    readonly?: boolean;
    readonlyContent?: string;
    value?: string;
    onChange?: (value: string) => void;
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: !readonly,
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });
  useEffect(() => {
    if (editor && !editor.isDestroyed && readonly) {
      editor.commands.setContent(readonlyContent);
    }
  }, [editor, readonlyContent, readonly]);
  if (!editor) {
    return null;
  }

  return (
    <EditorContent
      ref={ref}
      editor={editor}
      className={clsx({
        [styles["editor-readonly"]]: readonly,
        [styles.editor]: !readonly,
      })}
    />
  );
});
export default RichTextEditor;
