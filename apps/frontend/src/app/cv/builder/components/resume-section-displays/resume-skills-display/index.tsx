import { Tag, Typography } from "antd";

import { useStoreSkills } from "../../../hooks";
import ResumeSection from "../resume-section-display-layout";
import styles from "./resume-skills.module.scss";

export default function ResumeSkills() {
  const { storeGetSkills } = useStoreSkills();
  const skills = storeGetSkills();

  return (
    <ResumeSection title="SKILLS">
      <div className={styles.skills}>
        {skills.map((group) => (
          <div key={group.groupName}>
            <Typography.Title level={5}>{group.groupName}</Typography.Title>
            {group.items.map((item) => {
              return (
                <Tag key={item} className={styles.skill}>
                  {item}
                </Tag>
              );
            })}
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
