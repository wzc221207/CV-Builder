import { Button, Divider, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";

import styles from "./sidebar.module.scss";
import { setIsEditingResume, setSectionEditor } from "@/store/resume-slice";
import { siteName } from "@/constants/meta";
import ActionButton from "../action-button";

export default function Sidebar({
  sections,
}: {
  sections: { name: string; component: () => JSX.Element }[];
}) {
  const resumeStore = useAppSelector((state) => state.resume);
  const dispatch = useAppDispatch();
  function handleOpenSectionEditor(component: () => JSX.Element) {
    dispatch(setIsEditingResume(true));
    dispatch(setSectionEditor(component));
  }

  if (resumeStore.isEditingResume) {
    const SectionEditor = resumeStore.sectionEditor;
    return (
      <aside className={styles.sidebar}>
        <SectionEditor />
      </aside>
    );
  }
  return (
    <aside className={styles.sidebar}>
      <Typography.Title level={2} className={styles.title}>
        {siteName}
      </Typography.Title>
      <Divider>Resume Sections</Divider>
      {sections.map((section) => (
        <Button
          key={section.name}
          className={styles["section-editor-link-buton"]}
          onClick={() => handleOpenSectionEditor(section.component)}
        >
          <span>{section.name}</span>
          <RightOutlined className={styles["section-editor-link-icon"]} />
        </Button>
      ))}
      <Divider>Download Resume</Divider>
      <ActionButton
        type="primary"
        onClick={globalThis.print}
      >
        Download PDF
      </ActionButton>
    </aside>
  );
}
