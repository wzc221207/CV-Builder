import { Row, Col } from "antd";
import ResumeBasicInfo from "../resume-section-displays/resume-basic-info-display";
import ResumeEducation from "../resume-section-displays/resume-education-display";
import ResumeExperience from "../resume-section-displays/resume-experience-display";
import ResumeLanguages from "../resume-section-displays/resume-languages-display";
import ResumeProjects from "../resume-section-displays/resume-projects-display";
import ResumeSkills from "../resume-section-displays/resume-skills-display";
import ResumeSummary from "../resume-section-displays/resume-summary-display";
import styles from "./index.module.scss";
import { useActiveSections } from "../../hooks";

export default function Preview() {
  const { storeGetActiveSections } = useActiveSections();
  const activeSectionNames = storeGetActiveSections();

  return (
    <div className={styles["preview"]}>
      {activeSectionNames.includes("basicInfo") ? <ResumeBasicInfo /> : null}
      <div className={styles.sections}>
        <Row>
          <Col span={14}>
            {activeSectionNames.includes("summary") ? <ResumeSummary /> : null}
            {activeSectionNames.includes("experience") ? (
              <ResumeExperience />
            ) : null}
            {activeSectionNames.includes("projects") ? (
              <ResumeProjects />
            ) : null}
          </Col>
          <Col span={10}>
            {activeSectionNames.includes("skills") ? <ResumeSkills /> : null}
            {activeSectionNames.includes("education") ? (
              <ResumeEducation />
            ) : null}
            {activeSectionNames.includes("languages") ? (
              <ResumeLanguages />
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}
