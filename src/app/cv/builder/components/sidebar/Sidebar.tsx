import { siteName } from "@/constants/meta";
import {
  setIsEditingResume,
  setSectionEditor,
  setSections,
} from "@/store/resume-slice";
import { RightOutlined } from "@ant-design/icons";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect } from "react";

import {
  useActiveSections,
  useAllowLocalStorage,
  useLocalActiveSections,
  useLocalResumeData,
  useResumeEditing,
  useResumeStore,
} from "../../hooks";
import ActionButton from "../action-button";
import styles from "./sidebar.module.scss";
import { RESUME_DATA_KEY, VISIBLE_SECTIONS_KEY } from "../../constants";
import Link from "next/link";
import { Button, Divider, Typography } from "antd";

export default function Sidebar({
  sections,
}: {
  sections: { name: string; component: () => JSX.Element }[];
}) {
  const { resumeStore, dispatch } = useResumeStore();
  const { storeGetIsEditingResume } = useResumeEditing();
  const isEditingResume = storeGetIsEditingResume();
  const { storeSetActiveSections } = useActiveSections();
  const [localActiveSections] = useLocalActiveSections();
  const [allowDataLocalStorage, setAllowDataLocalStorage] =
    useAllowLocalStorage();
  const [localResumeData, setLocalResumeData] = useLocalResumeData();
  useEffect(() => {
    // load data from local storage for first render
    if (allowDataLocalStorage && localActiveSections) {
      storeSetActiveSections(localActiveSections);
    }
    if (allowDataLocalStorage && localResumeData) {
      dispatch(setSections(localResumeData));
    }
  }, []);
  useEffect(() => {
    if (allowDataLocalStorage) {
      setLocalResumeData(resumeStore.sections); // sync data to local storage
    }
  }, [allowDataLocalStorage, resumeStore.sections, setLocalResumeData]);

  function handleOpenSectionEditor(component: () => JSX.Element) {
    dispatch(setIsEditingResume(true));
    dispatch(setSectionEditor(component));
  }
  function handleToggleDataStorageOption(e: CheckboxChangeEvent) {
    if (!e.target.checked) {
      window.localStorage.removeItem(RESUME_DATA_KEY);
      window.localStorage.removeItem(VISIBLE_SECTIONS_KEY);
    }
    setAllowDataLocalStorage(e.target.checked);
  }

  if (isEditingResume) {
    const SectionEditor = resumeStore.sectionEditor;
    return (
      <aside className={styles.sidebar}>
        <SectionEditor />
      </aside>
    );
  }
  return (
    <aside className={styles.sidebar}>
      <header className={styles.title}>
        <Link href="/">{siteName}</Link>
      </header>
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
      <Divider>Download</Divider>
      <ActionButton type="primary" onClick={globalThis.print}>
        Download PDF
      </ActionButton>
      <Divider>Settings</Divider>
      <Typography.Title level={5}>Storage</Typography.Title>
      <Typography.Paragraph>
        By default, data is not persisted so it will reset to default on every
        page refresh. By allowing storing data locally, the resume data will be
        stored on your local browser.
      </Typography.Paragraph>
      <Checkbox
        checked={allowDataLocalStorage}
        onChange={handleToggleDataStorageOption}
      >
        Allow Data to be stored locally on the browser
      </Checkbox>
    </aside>
  );
}
