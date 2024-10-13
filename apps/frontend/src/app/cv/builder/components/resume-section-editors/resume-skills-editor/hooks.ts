import { ResumeSkills } from "@/store/resume-slice";
import { InputRef } from "antd";
import { useEffect, useRef, useState } from "react";

export function useSkills(initialSkills: ResumeSkills) {
  const [skills, setSkills] = useState(initialSkills);
  // state for adding new skills
  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState<{
    groupName: string;
  }>({ groupName: "" });
  // state for editing skills
  const [editSkillData, setEditSkillData] = useState("");
  const [editingSkill, setEditingSkill] = useState<{
    groupName: string;
    itemIdx: number;
  }>({ groupName: "", itemIdx: -1 });
  // state for editing group names
  const [editGroupName, setEditGroupName] = useState("");
  const [editingGroupName, setEditingGroupName] = useState<{
    oldName: string;
  }>({ oldName: "" });
  // refs that references input elements for skill addition, edition, and group name edition
  const editSkillRef = useRef<InputRef>(null);
  const addSkillRef = useRef<InputRef>(null);
  const editGroupNameRef = useRef<InputRef>(null);
  // effects that allow input elements to auto focus
  useEffect(() => {
    if (editSkillRef.current) editSkillRef.current.focus();
  }, [editingSkill]);
  useEffect(() => {
    if (addSkillRef.current) addSkillRef.current.focus();
  }, [addingSkill]);
  useEffect(() => {
    if (editGroupNameRef.current) editGroupNameRef.current.focus();
  }, [editingGroupName]);

  function handleDeleteSkill(groupName: string, tagName: string) {
    const newSkills = skills.map((group) => {
      if (group.groupName !== groupName) {
        return group;
      }
      return {
        ...group,
        items: group.items.filter((item) => item !== tagName),
      };
    });

    setSkills(newSkills);
  }

  function handleDeleteGroup(groupIdx: number) {
    const newSkills = skills.filter((_, idx) => idx !== groupIdx);

    setSkills(newSkills);
  }

  function handleAddNewskill(groupName: string) {
    const newSkills = skills.map((group) => {
      if (group.groupName !== groupName) {
        return group;
      }
      return {
        ...group,
        items: [...group.items, newSkill],
      };
    });

    setSkills(newSkills);
    handleLeaveSkillAdd();
  }

  function handleAddNewGroup() {
    setSkills([...skills, { groupName: "Untitled", items: [] }]);
  }

  function handleStartEditingSkill(
    groupName: string,
    itemIdx: number,
    item: string
  ) {
    setEditingSkill({
      groupName: groupName,
      itemIdx: itemIdx,
    });
    setEditSkillData(item);
  }

  function handleCommitSkillEdit(groupName: string, itemIdx: number) {
    const newSkills = skills.map((group) => {
      if (group.groupName !== groupName) {
        return group;
      }
      return {
        ...group,
        items: group.items.map((item, idx) => {
          if (idx === itemIdx) {
            return editSkillData;
          }
          return item;
        }),
      };
    });

    setSkills(newSkills);
    setEditingSkill({
      groupName: "",
      itemIdx: -1,
    });
    setEditSkillData("");
  }

  function handleLeaveSkillEdit() {
    setEditingSkill({
      groupName: "",
      itemIdx: -1,
    });
    setEditSkillData("");
  }

  function handleLeaveSkillAdd() {
    setAddingSkill({ groupName: "" });
    setNewSkill("");
  }

  function handleStartEditingGroupName(name: string) {
    setEditingGroupName({ oldName: name });
    setEditGroupName(name);
  }

  function handleLeaveGroupNameEdit() {
    setEditingGroupName({ oldName: "" });
  }

  function handleChangeGroupName() {
    const newSkills = skills.map((group) => {
      if (group.groupName !== editingGroupName.oldName) {
        return group;
      }
      return {
        ...group,
        groupName: editGroupName,
      };
    });
    setSkills(newSkills);
  }

  return {
    states: {
      skills,
      setSkills,
      newSkill,
      setNewSkill,
      addingSkill,
      setAddingSkill,
      editSkillData,
      setEditSkillData,
      editingSkill,
      setEditingSkill,
      editGroupName,
      setEditGroupName,
      editingGroupName,
      setEditingGroupName,
    },
    handlers: {
      handleDeleteSkill,
      handleDeleteGroup,
      handleAddNewskill,
      handleAddNewGroup,
      handleStartEditingSkill,
      handleCommitSkillEdit,
      handleLeaveSkillEdit,
      handleLeaveSkillAdd,
      handleStartEditingGroupName,
      handleLeaveGroupNameEdit,
      handleChangeGroupName,
    },
    refs: {
      editSkillRef,
      addSkillRef,
      editGroupNameRef,
    },
  };
}

export type useSkillsReturnType = ReturnType<typeof useSkills>;
