"use client";

import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";
import "@/i18n";
import styles from "./page.module.scss";
import { sectionEditors } from "./constants";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("./components/sidebar/Sidebar"), {
  ssr: false,
});
const Preview = dynamic(() => import("./components/preview"), {
  ssr: false,
});

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
