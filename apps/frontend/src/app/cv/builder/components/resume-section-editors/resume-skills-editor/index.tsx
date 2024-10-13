import { useResumeEditing, useStoreSkills } from "@/app/cv/builder/hooks";
import { message, Space } from "antd";

import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import { useSkills } from "./hooks";
import styles from "./index.module.scss";
import SkillGroupCard from "./SkillGroupCard";
import { SkillsContext } from "./contexts";
import ActionButton from "../../action-button";
import SectionVisibilityToggler from "../resume-visibility-toggler";

export default function ResumeSkillsEditor() {
  const { storeGetSkills, storeSetSkills } = useStoreSkills();
  const { storeSetIsEditingResume } = useResumeEditing();
  const ctx = useSkills(storeGetSkills());

  function handleSave() {
    storeSetSkills(ctx.states.skills);
    storeSetIsEditingResume(false);
    message.success("Changes saved successfully");
  }

  return (
    <ResumeSectionEditorLayout title="Skills">
      <SectionVisibilityToggler sectionName="skills" />
      <SkillsContext.Provider value={ctx}>
        <div className={styles.skills}>
          {ctx.states.skills.map((group, groupIdx) => (
            <SkillGroupCard
              key={group.groupName + groupIdx}
              group={group}
              groupIdx={groupIdx}
            />
          ))}
        </div>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <ActionButton type="dashed" onClick={ctx.handlers.handleAddNewGroup}>
            Add Skills Group
          </ActionButton>
          <ActionButton type="primary" onClick={handleSave}>
            Save
          </ActionButton>
        </Space>
      </SkillsContext.Provider>
    </ResumeSectionEditorLayout>
  );
}
