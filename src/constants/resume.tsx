import { dateFormat } from "@/app/cv/builder/constants";
import { ResumeState } from "@/store/resume-slice";
import dayjs from "dayjs";

export const defaultResumeState: ResumeState = {
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
