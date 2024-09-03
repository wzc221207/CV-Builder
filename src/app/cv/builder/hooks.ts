import {
  ResumeBasicInfo,
  ResumeExperience,
  ResumeSkills,
  ResumeSummary,
  setIsEditingResume,
  setSectionBasicInfo,
  setSectionSkills,
  setSectionSummary,
  setSectionExperience,
  ResumeEducation,
  setSectionEducation,
  ResumeProjects,
  ResumeLanguages,
  setSectionProjects,
  setSectionLanguages,
} from "@/store/resume-slice";

import { useAppDispatch, useAppSelector } from "@/store";

export function useResumeStore() {
  const resumeStore = useAppSelector((state) => state.resume);
  const dispatch = useAppDispatch();

  return { resumeStore, dispatch };
}

export function useStoreSkills() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetSkills = () => resumeStore.sections.skills;
  const storeSetSkills = (skills: ResumeSkills) =>
    dispatch(setSectionSkills(skills));
  return { storeGetSkills, storeSetSkills };
}

export function useStoreBasicInfo() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetBasicInfo = () => resumeStore.sections.basicInfo;
  const storeSetBasicInfo = (basicInfo: ResumeBasicInfo) =>
    dispatch(setSectionBasicInfo(basicInfo));
  return { storeGetBasicInfo, storeSetBasicInfo };
}

export function useStoreSummary() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetSummary = () => resumeStore.sections.summary;
  const storeSetSummary = (summary: ResumeSummary) =>
    dispatch(setSectionSummary(summary));
  return { storeGetSummary, storeSetSummary };
}

export function useStoreExperience() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetExperience = () => resumeStore.sections.experience;
  const storeSetExperience = (experience: ResumeExperience) =>
    dispatch(setSectionExperience(experience));
  return { storeGetExperience, storeSetExperience };
}

export function useStoreEducation() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetEducation = () => resumeStore.sections.eudcation;
  const storeSetEducation = (education: ResumeEducation) =>
    dispatch(setSectionEducation(education));
  return { storeGetEducation, storeSetEducation };
}

export function useStoreProjects() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetProjects = () => resumeStore.sections.projects;
  const storeSetProjects = (projects: ResumeProjects) =>
    dispatch(setSectionProjects(projects));
  return { storeGetProjects, storeSetProjects };
}

export function useStoreLanguages() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetLanguages = () => resumeStore.sections.languages;
  const storeSetLanguages = (languages: ResumeLanguages) =>
    dispatch(setSectionLanguages(languages));
  return { storeGetLanguages, storeSetLanguages };
}

export function useResumeEditing() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetIsEditingResume = () => resumeStore.isEditingResume;
  const storeSetIsEditingResume = (editing: boolean) =>
    dispatch(setIsEditingResume(editing));
  return { storeGetIsEditingResume, storeSetIsEditingResume };
}
