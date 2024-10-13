import { Col, Row, Typography } from "antd";

import { useStoreLanguages } from "../../../hooks";
import ResumeSection from "../resume-section-display-layout";
import styles from "./index.module.scss";

export default function ResumeLanguages() {
  const { storeGetLanguages } = useStoreLanguages();
  const languages = storeGetLanguages();

  return (
    <ResumeSection title="LANGUAGES">
      <div>
        {languages.map((language) => {
          return (
            <div key={language.name} className={styles["language-item"]}>
              <Row>
                <Col span={16}>
                  <Typography.Title level={5}>{language.name}</Typography.Title>
                </Col>
                <Col span={8} className={styles["language-level"]}>
                  <span>{language.level}</span>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </ResumeSection>
  );
}
