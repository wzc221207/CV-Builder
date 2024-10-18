import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  resumeSectionTranslationsForChinese,
  resumeSectionTranslationsForEnglish,
} from "./resume-sections";

const resources = {
  en: {
    translation: {
      // Home
      "Get Started": "Get Started",
      // Resume Sections
      ...resumeSectionTranslationsForEnglish,
      // Download
      Download: "Download",
      "Download PDF": "Download PDF",
      // Settings
      Storage: "Storage",
      "Storage Prompt":
        "By default, data is not persisted so it will reset to default on every \
        page refresh. By allowing storing data locally, the resume data will be \
        stored on your local browser.",
      "Allow Local Storage": "Allow Data to be stored locally on the browser",
      Settings: "Settings",
    },
  },
  zh: {
    translation: {
      // Home
      "Get Started": "开始使用",
      // Resume Sections
      ...resumeSectionTranslationsForChinese,
      // Download
      Download: "下载",
      "Download PDF": "下载PDF",
      // Settings
      Storage: "存储",
      "Storage Prompt":
        "默认情况下，数据不会存储到本地浏览器存储空间中，所以每次刷新页面数据会恢复默认。允许以下本地存储选项，数据将会持久化到本地游览器中。",
      "Allow Local Storage": "允许数据存储到本地游览器",
      Settings: "设置",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
