import { useResumeEditing, useStoreSkills } from "@/app/cv/builder/hooks";
import { Button, message } from "antd";

import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import { useSkills } from "./hooks";
import styles from "./index.module.scss";
import SkillGroupCard from "./SkillGroupCard";
import { SkillsContext } from "./contexts";

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
        <Button
          type="dashed"
          className={styles["button"]}
          onClick={ctx.handlers.handleAddNewGroup}
        >
          Add Skills Group
        </Button>
        <Button
          type="primary"
          className={styles["button"]}
          onClick={handleSave}
        >
          Save
        </Button>
      </SkillsContext.Provider>
    </ResumeSectionEditorLayout>
  );
}
