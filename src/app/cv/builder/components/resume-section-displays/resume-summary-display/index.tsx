import { useAppSelector } from "@/store";

import styles from "./index.module.scss";
import ResumeSection from "../resume-section-display-layout";
import RichTextEditor from "../../rich-text-editor";
import { useStoreSummary } from "../../../hooks";

export default function ResumeSummary() {
  const { storeGetSummary } = useStoreSummary();
  const summary = storeGetSummary();

  return (
    <ResumeSection title="SUMMARY">
      <RichTextEditor readonly={true} readonlyContent={summary.selfSummary} />
    </ResumeSection>
  );
}
