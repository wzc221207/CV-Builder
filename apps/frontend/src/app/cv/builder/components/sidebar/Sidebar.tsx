import { siteName } from "@/constants/meta";
import {
  setIsEditingResume,
  setSectionEditor,
  setSections,
} from "@/store/resume-slice";
import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Select, Typography } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import { RESUME_DATA_KEY, VISIBLE_SECTIONS_KEY } from "../../constants";
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
  const { t } = useTranslation();

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
      <header className={styles.header}>
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <Link href="/" className={styles.title}>
              {siteName}
            </Link>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <Select
              defaultValue="en"
              value={i18n.language}
              options={[
                { value: "en", label: <span>English</span> },
                { value: "zh", label: <span>中文</span> },
              ]}
              className={styles["language-selector"]}
              onChange={(value) => {
                i18n.changeLanguage(value);
              }}
            />
          </Col>
        </Row>
      </header>
      <Divider>{t("Resume Sections")}</Divider>
      {sections.map((section) => (
        <Button
          key={section.name}
          className={styles["section-editor-link-buton"]}
          onClick={() => handleOpenSectionEditor(section.component)}
        >
          <span>{t(section.name)}</span>
          <RightOutlined className={styles["section-editor-link-icon"]} />
        </Button>
      ))}
      <Divider>{t("Download")}</Divider>
      <ActionButton type="primary" onClick={globalThis.print}>
        {t("Download PDF")}
      </ActionButton>
      <Divider>{t("Settings")}</Divider>
      <Typography.Title level={5}>{t("Storage")}</Typography.Title>
      <Typography.Paragraph>{t("Storage Prompt")}</Typography.Paragraph>
      <Checkbox
        checked={allowDataLocalStorage}
        onChange={handleToggleDataStorageOption}
      >
        {t("Allow Local Storage")}
      </Checkbox>
    </aside>
  );
}
