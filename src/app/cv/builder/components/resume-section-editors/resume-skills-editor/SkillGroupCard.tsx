import { ResumeSkill } from "@/store/resume-slice";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Tag, Typography } from "antd";
import clsx from "clsx";

import styles from "./skill-card.module.scss";
import { useContext } from "react";
import { SkillsContextType, SkillsContext } from "./contexts";

export default function SkillGroupCard({
  group,
  groupIdx,
}: {
  group: ResumeSkill;
  groupIdx: number;
}) {
  const ctx = useContext(SkillsContext) as SkillsContextType;
  const { states, handlers, refs } = ctx;

  return (
    <div className={styles["group"]}>
      <div className={styles["group-header"]}>
        {states.editingGroupName.oldName === group.groupName ? (
          <Input
            ref={refs.editGroupNameRef}
            className={styles["group-name-input"]}
            type="text"
            size="middle"
            value={states.editGroupName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              states.setEditGroupName(e.target.value);
            }}
            onBlur={handlers.handleLeaveGroupNameEdit}
            onPressEnter={() => handlers.handleChangeGroupName()}
          />
        ) : (
          <Typography.Title
            level={5}
            onDoubleClick={() =>
              handlers.handleStartEditingGroupName(group.groupName)
            }
          >
            {group.groupName}
          </Typography.Title>
        )}

        <span onClick={() => handlers.handleDeleteGroup(groupIdx)}>
          <DeleteOutlined className={styles["delete-group-icon"]} />
        </span>
      </div>

      {group.items.map((item, itemIdx) => {
        if (
          group.groupName === states.editingSkill.groupName &&
          itemIdx === states.editingSkill.itemIdx
        ) {
          return (
            <Input
              key={item}
              ref={refs.editSkillRef}
              type="text"
              size="small"
              className={styles["skill-input"]}
              value={states.editSkillData}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                states.setEditSkillData(e.target.value)
              }
              onBlur={handlers.handleLeaveSkillEdit}
              onPressEnter={() =>
                handlers.handleCommitSkillEdit(group.groupName, itemIdx)
              }
            />
          );
        }
        return (
          <Tag
            key={item}
            className={styles["skill-tag"]}
            closeIcon
            onDoubleClick={() =>
              handlers.handleStartEditingSkill(group.groupName, itemIdx, item)
            }
            onClose={() => handlers.handleDeleteSkill(group.groupName, item)}
          >
            {item}
          </Tag>
        );
      })}
      {states.addingSkill.groupName === group.groupName ? (
        <Input
          type="text"
          ref={refs.addSkillRef}
          size="small"
          className={styles["skill-input"]}
          value={states.newSkill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            states.setNewSkill(e.target.value)
          }
          placeholder="Enter New Skill"
          onBlur={handlers.handleLeaveSkillAdd}
          onPressEnter={() => handlers.handleAddNewskill(group.groupName)}
        />
      ) : (
        <Tag
          className={clsx([styles["skill-tag"], styles["new-skill-tag"]])}
          icon={<PlusOutlined />}
          onClick={() => states.setAddingSkill({ groupName: group.groupName })}
        >
          New Skill
        </Tag>
      )}
    </div>
  );
}
