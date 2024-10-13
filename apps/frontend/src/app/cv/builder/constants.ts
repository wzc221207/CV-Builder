import ResumeBasicInfoEditor from "./components/resume-section-editors/resume-basic-info-editor";
import ResumeEducationEditor from "./components/resume-section-editors/resume-education-editor";
import ResumeExperienceEditor from "./components/resume-section-editors/resume-experience-editor";
import ResumeLanguagesEditor from "./components/resume-section-editors/resume-languages-editor";
import ResumeProjectsEditor from "./components/resume-section-editors/resume-projects-editor";
import ResumeSkillsEditor from "./components/resume-section-editors/resume-skills-editor";
import ResumeSummaryEditor from "./components/resume-section-editors/resume-summary-editor";

export const sectionEditors = [
  {
    name: "Basic Information",
    component: ResumeBasicInfoEditor,
  },
  {
    name: "Summary",
    component: ResumeSummaryEditor,
  },
  {
    name: "Skills",
    component: ResumeSkillsEditor,
  },
  {
    name: "Experience",
    component: ResumeExperienceEditor,
  },
  {
    name: "Education",
    component: ResumeEducationEditor,
  },
  {
    name: "Projects",
    component: ResumeProjectsEditor,
  },
  {
    name: "Languages",
    component: ResumeLanguagesEditor,
  },
];

export const dateFormat = "MM/YYYY";

// Local Storage Keys
export const ALLOW_LOCAL_DATA_STORAGE_KEY = "allow-local-data-storage";
export const RESUME_DATA_KEY = "resume-data";
export const VISIBLE_SECTIONS_KEY = "active-sections";
