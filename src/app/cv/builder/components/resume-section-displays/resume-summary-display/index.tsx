import { useStoreSummary } from "../../../hooks";
import RichTextEditor from "../../rich-text-editor";
import ResumeSection from "../resume-section-display-layout";
import styles from "./index.module.scss";

export default function ResumeSummary() {
  const { storeGetSummary } = useStoreSummary();
  const summary = storeGetSummary();

  return (
    <ResumeSection title="SUMMARY">
      <RichTextEditor readonly={true} readonlyContent={summary.selfSummary} />
    </ResumeSection>
  );
}
