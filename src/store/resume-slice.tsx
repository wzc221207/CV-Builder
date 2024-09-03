import { dateFormat } from "@/app/cv/builder/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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

export interface ResumeState {
  isEditingResume: boolean;
  sectionEditor: () => JSX.Element;
  sections: {
    basicInfo: ResumeBasicInfo;
    summary: ResumeSummary;
    skills: ResumeSkills;
    experience: ResumeExperience;
    eudcation: ResumeEducation;
    projects: ResumeProjects;
    languages: ResumeLanguages;
  };
}

const initialState: ResumeState = {
  isEditingResume: false,
  sectionEditor: () => <></>,
  sections: {
    basicInfo: {
      name: "Ethan Wilder",
      jobTitle: "Software Engineer",
      email: "ethan.wilder@example.com",
      phone: "(123) 456-7890",
      location: "San Francisco, CA",
    },
    summary: {
      selfSummary:
        "Software Engineer with 5+ years of experience in full-stack development, specializing in building scalable web applications. Proficient in JavaScript, Python, and modern frameworks like React and Node.js. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.",
    },
    skills: [
      {
        groupName: "Programming Languages",
        items: ["Python", "Java", "Javascript"],
      },
      { groupName: "Backend", items: ["Springboot", "Express.js"] },
      { groupName: "Version Control", items: ["Git", "Github"] },
    ],
    experience: [
      {
        jobTitle: "Software Engineer",
        company: "ABC Corp",
        startDate: dayjs("06/2020", dateFormat),
        endDate: dayjs("03/2022", dateFormat),
        location: "San Francisco, CA",
        description:
          "<ul><li><p>Designed and developed scalable web applications using React and Node.js. </p></li><li><p>Led a team of 5 engineers to redesign an e-commerce platform, increasing user engagement by 20%.</p></li><li><p>Optimized API performance, reducing response time by 30%.</p></li></ul>",
      },
      {
        jobTitle: "Software Engineer",
        company: "XYZ Solutions",
        startDate: dayjs("05/2018", dateFormat),
        endDate: dayjs("05/2020", dateFormat),
        location: "San Francisco, CA",
        description:
          "<ul><li><p>Collaborated on building a real-time chat application for over 10,000 users. </p></li><li><p>Implemented RESTful APIs and integrated third-party services using Node.js and Express.js. </p></li><li><p>Automated testing processes, reducing bugs by 15%.</p></li></ul>",
      },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description:
          "Built a full-stack application using React and Node.js, handling authentication, product management, and payments.",
      },
      {
        title: "Portfolio Website",
        description:
          "Developed a personal portfolio website using React, showcasing projects and blogs.",
      },
    ],
    eudcation: [
      {
        name: "University of California, Berkeley",
        major: "B.S. in Computer Science",
        graduationDate: dayjs("05/2018", dateFormat),
        location: "United States",
      },
    ],
    languages: [
      {
        name: "English",
        level: "Proficient",
      },
    ],
  },
};

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
} = userSlice.actions;
export default userSlice.reducer;
