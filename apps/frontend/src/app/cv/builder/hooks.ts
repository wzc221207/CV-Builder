import { useAppDispatch, useAppSelector } from "@/store";
import {
  ResumeBasicInfo,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguages,
  ResumeProjects,
  ResumeSections,
  ResumeSkills,
  ResumeSummary,
  SectionName,
  setActiveSections,
  setIsEditingResume,
  setSectionBasicInfo,
  setSectionEducation,
  setSectionExperience,
  setSectionLanguages,
  setSectionProjects,
  setSectionSkills,
  setSectionSummary,
} from "@/store/resume-slice";
import { useLocalStorageState } from "ahooks";
import dayjs from "dayjs";
import {
  ALLOW_LOCAL_DATA_STORAGE_KEY,
  RESUME_DATA_KEY,
  VISIBLE_SECTIONS_KEY,
} from "./constants";

// Redux Store Hooks

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

export function useActiveSections() {
  const { resumeStore, dispatch } = useResumeStore();
  const storeGetActiveSections = () => resumeStore.activeSections;
  const storeSetActiveSections = (actoveSections: SectionName[]) =>
    dispatch(setActiveSections(actoveSections));
  return { storeGetActiveSections, storeSetActiveSections };
}

// Local Storage Hooks

export function useAllowLocalStorage() {
  return useLocalStorageState(ALLOW_LOCAL_DATA_STORAGE_KEY, {
    defaultValue: false,
  });
}

export function useLocalActiveSections() {
  return useLocalStorageState<SectionName[] | null>(VISIBLE_SECTIONS_KEY, {
    defaultValue: null,
  });
}

export function useLocalResumeData() {
  return useLocalStorageState<ResumeSections | undefined>(RESUME_DATA_KEY, {
    defaultValue: undefined,
    deserializer: (val) => {
      return JSON.parse(val, (k, v) => {
        const dateFields = ["startDate", "endDate", "graduationDate"];
        if (dateFields.includes(k)) {
          return dayjs(v);
        }
        return v;
      });
    },
  });
}
