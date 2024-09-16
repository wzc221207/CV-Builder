import { Row, Col } from "antd";
import ResumeBasicInfo from "../resume-section-displays/resume-basic-info-display";
import ResumeEducation from "../resume-section-displays/resume-education-display";
import ResumeExperience from "../resume-section-displays/resume-experience-display";
import ResumeLanguages from "../resume-section-displays/resume-languages-display";
import ResumeProjects from "../resume-section-displays/resume-projects-display";
import ResumeSkills from "../resume-section-displays/resume-skills-display";
import ResumeSummary from "../resume-section-displays/resume-summary-display";
import styles from "./index.module.scss";

export default function Preview() {
  return (
    <div className={styles["preview"]}>
      <ResumeBasicInfo />
      <div className={styles.sections}>
        <Row>
          <Col span={14}>
            <ResumeSummary />
            <ResumeExperience />
            <ResumeLanguages />
          </Col>
          <Col span={10}>
            <ResumeSkills />
            <ResumeEducation />
            <ResumeProjects />
          </Col>
        </Row>
      </div>
    </div>
  );
}
