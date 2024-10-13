import { dateFormat } from "@/app/cv/builder/constants";
import { CalendarFilled, EnvironmentFilled } from "@ant-design/icons";
import { Space, Typography } from "antd";

import { useStoreEducation } from "../../../hooks";
import ResumeSection from "../resume-section-display-layout";
import styles from "./index.module.scss";

export default function ResumeEducation() {
  const { storeGetEducation } = useStoreEducation();
  const eudcation = storeGetEducation();

  return (
    <ResumeSection title="EDUCATION">
      <div>
        {eudcation.map((university) => (
          <div key={university.name} className={styles["university"]}>
            <Typography.Title level={5} className={styles["university-name"]}>
              {university.name}
            </Typography.Title>
            <Typography.Paragraph className={styles["degree-and-major"]}>
              {university.major}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles["date"]}>
              <Space>
                <CalendarFilled />
                <span>{university.graduationDate.format(dateFormat)}</span>
              </Space>
            </Typography.Paragraph>
            <Typography.Paragraph className={styles["location"]}>
              <Space>
                <EnvironmentFilled />
                <span>{university.location}</span>
              </Space>
            </Typography.Paragraph>
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
