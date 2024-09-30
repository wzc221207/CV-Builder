import { siteName } from "@/constants/meta";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  ResumeSections,
  setIsEditingResume,
  setSectionEditor,
  setSections,
} from "@/store/resume-slice";
import { RightOutlined } from "@ant-design/icons";
import { useLocalStorageState } from "ahooks";
import { Button, Checkbox, Divider, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect } from "react";

import ActionButton from "../action-button";
import styles from "./sidebar.module.scss";
import dayjs from "dayjs";
import Link from "next/link";

const ALLOW_LOCAL_DATA_STORAGE_KEY = "allow-local-data-storage";
const RESUME_DATA_KEY = "resume-data";

export default function Sidebar({
  sections,
}: {
  sections: { name: string; component: () => JSX.Element }[];
}) {
  const resumeStore = useAppSelector((state) => state.resume);
  const dispatch = useAppDispatch();
  const [allowDataLocalStorage, setAllowDataLocalStorage] =
    useLocalStorageState(ALLOW_LOCAL_DATA_STORAGE_KEY, {
      defaultValue: false,
    });
  const [storedResumeData, setStoredResumeData] = useLocalStorageState<
    ResumeSections | undefined
  >(RESUME_DATA_KEY, {
    defaultValue: undefined,
    deserializer: (val) => {
      return JSON.parse(val, (k, v) => {
        const dateFields = ["startDate", "endDate", "graduationDate"];
        if (dateFields.includes(k)) {
          return dayjs(v);
        }
        return v;
      });
    },
  });
  useEffect(() => {
    if (allowDataLocalStorage && storedResumeData) {
      dispatch(setSections(storedResumeData)); // load data from local storage for first render
    }
  }, []);
  useEffect(() => {
    if (allowDataLocalStorage) {
      setStoredResumeData(resumeStore.sections); // sync data to local storage
    }
  }, [allowDataLocalStorage, resumeStore.sections, setStoredResumeData]);

  function handleOpenSectionEditor(component: () => JSX.Element) {
    dispatch(setIsEditingResume(true));
    dispatch(setSectionEditor(component));
  }
  function handleToggleDataStorageOption(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      setStoredResumeData(resumeStore.sections);
    } else {
      window.localStorage.removeItem(RESUME_DATA_KEY);
    }
    setAllowDataLocalStorage(e.target.checked);
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
