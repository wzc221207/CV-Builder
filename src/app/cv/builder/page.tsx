"use client";

import { Col, Row } from "antd";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

import styles from "./page.module.scss";
import ResumeBasicInfo from "./components/resume-section-displays/resume-basic-info-display";
import ResumeSummary from "./components/resume-section-displays/resume-summary-display";
import ResumeExperience from "./components/resume-section-displays/resume-experience-display";
import ResumeEducation from "./components/resume-section-displays/resume-education-display";
import ResumeSkills from "./components/resume-section-displays/resume-skills-display";
import ResumeProjects from "./components/resume-section-displays/resume-projects-display";
import ResumeLanguages from "./components/resume-section-displays/resume-languages-display";
import Sidebar from "./components/sidebar/Sidebar";
import { sectionEditors } from "./constants";

export default function ResumeEditor() {
  return (
    <ReduxProvider store={store}>
      <main>
        <Row>
          <Col span={8} className={styles["sidebar-container"]}>
            <Sidebar sections={sectionEditors} />
          </Col>
          <Col span={16} className={styles["preview-container"]}>
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
          </Col>
        </Row>
      </main>
    </ReduxProvider>
  );
}
