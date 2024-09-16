"use client";

import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

import styles from "./page.module.scss";
import Sidebar from "./components/sidebar/Sidebar";
import { sectionEditors } from "./constants";
import Preview from "./components/preview";

export default function ResumeBuilder() {
  return (
    <ReduxProvider store={store}>
      <main className={styles.builder}>
        <div className={styles["sidebar-container"]}>
          <Sidebar sections={sectionEditors} />
        </div>
        <div className={styles["preview-container"]}>
          <Preview />
        </div>
      </main>
    </ReduxProvider>
  );
}
