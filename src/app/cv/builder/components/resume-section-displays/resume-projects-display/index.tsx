import { Typography } from "antd";

import { useStoreProjects } from "../../../hooks";
import RichTextEditor from "../../rich-text-editor";
import ResumeSection from "../resume-section-display-layout";
import styles from "./index.module.scss";

export default function ResumeProjects() {
  const { storeGetProjects } = useStoreProjects();
  const projects = storeGetProjects();

  return (
    <ResumeSection title="PROJECTS">
      <div>
        {projects.map((project) => (
          <div key={project.title} className={styles["project"]}>
            <Typography.Title level={5} className={styles["title"]}>
              {project.title}
            </Typography.Title>
            <RichTextEditor
              readonly={true}
              readonlyContent={project.description}
            />
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
