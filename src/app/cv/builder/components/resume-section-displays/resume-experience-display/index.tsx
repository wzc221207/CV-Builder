import { dateFormat } from "@/app/cv/builder/constants";
import { useAppSelector } from "@/store";
import { CalendarFilled, EnvironmentFilled } from "@ant-design/icons";
import { Space, Typography } from "antd";

import ResumeSection from "../resume-section-display-layout";
import styles from "./index.module.scss";
import RichTextEditor from "../../rich-text-editor";
import { useStoreExperience } from "../../../hooks";

export default function ResumeExperience() {
  const { storeGetExperience } = useStoreExperience();
  const experience = storeGetExperience();

  return (
    <ResumeSection title="EXPERIENCE">
      <div>
        {experience.map((exp) => (
          <div key={exp.company} className={styles["company"]}>
            <Typography.Title level={5} className={styles["job-title"]}>
              {exp.jobTitle}
            </Typography.Title>
            <Typography.Paragraph className={styles["company-name"]}>
              {exp.company}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles["date-and-location"]}>
              <Space size="large">
                <Space>
                  <CalendarFilled />
                  <span>
                    {exp.startDate.format(dateFormat)}&nbsp;-&nbsp;
                    {exp.endDate.format(dateFormat)}
                  </span>
                </Space>
                <Space>
                  <EnvironmentFilled />
                  <span>{exp.location}</span>
                </Space>
              </Space>
            </Typography.Paragraph>
            <RichTextEditor readonly={true} readonlyContent={exp.description} />
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
