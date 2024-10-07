import { defaultResumeState } from "@/constants/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export type SectionName =
  | "basicInfo"
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "languages";

export interface ResumeBasicInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
}

export interface ResumeSummary {
  selfSummary: string;
}

export interface ResumeSkill {
  groupName: string;
  items: string[];
}

export type ResumeSkills = ResumeSkill[];

export interface ResumeExperienceItem {
  jobTitle: string;
  company: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  location: string;
  description: string;
}

export type ResumeExperience = ResumeExperienceItem[];

export interface ResumeEducationItem {
  name: string;
  major: string;
  graduationDate: dayjs.Dayjs;
  location: string;
}

export type ResumeEducation = ResumeEducationItem[];

export interface ResumeProject {
  title: string;
  description: string;
}

export type ResumeProjects = ResumeProject[];

export interface ResumeLanguage {
  name: string;
  level: string;
}

export type ResumeLanguages = ResumeLanguage[];

export type ResumeSections = {
  basicInfo: ResumeBasicInfo;
  summary: ResumeSummary;
  skills: ResumeSkills;
  experience: ResumeExperience;
  eudcation: ResumeEducation;
  projects: ResumeProjects;
  languages: ResumeLanguages;
};

export interface ResumeState {
  isEditingResume: boolean;
  sectionEditor: () => JSX.Element;
  sections: ResumeSections;
  activeSections: SectionName[];
}

const initialState: ResumeState = defaultResumeState;

const userSlice = createSlice({
  name: "resume",
  initialState: initialState,
  reducers: {
    setIsEditingResume(state, action: PayloadAction<boolean>) {
      state.isEditingResume = action.payload;
    },
    setSectionEditor(state, action: PayloadAction<() => JSX.Element>) {
      state.sectionEditor = action.payload;
    },
    setSectionSummary(state, action: PayloadAction<ResumeSummary>) {
      state.sections.summary = action.payload;
    },
    setSectionSkills(state, action: PayloadAction<ResumeSkills>) {
      state.sections.skills = action.payload;
    },
    setSectionBasicInfo(state, action: PayloadAction<ResumeBasicInfo>) {
      state.sections.basicInfo = action.payload;
    },
    setSectionExperience(state, action: PayloadAction<ResumeExperience>) {
      state.sections.experience = action.payload;
    },
    setSectionEducation(state, action: PayloadAction<ResumeEducation>) {
      state.sections.eudcation = action.payload;
    },
    setSectionProjects(state, action: PayloadAction<ResumeProjects>) {
      state.sections.projects = action.payload;
    },
    setSectionLanguages(state, action: PayloadAction<ResumeLanguages>) {
      state.sections.languages = action.payload;
    },
    setSections(state, action: PayloadAction<ResumeSections>) {
      state.sections = action.payload;
    },
    setActiveSections(state, action: PayloadAction<SectionName[]>) {
      state.activeSections = action.payload;
    },
  },
});

export const {
  setIsEditingResume,
  setSectionEditor,
  setSectionSummary,
  setSectionSkills,
  setSectionBasicInfo,
  setSectionExperience,
  setSectionEducation,
  setSectionProjects,
  setSectionLanguages,
  setSections,
  setActiveSections,
} = userSlice.actions;
export default userSlice.reducer;
