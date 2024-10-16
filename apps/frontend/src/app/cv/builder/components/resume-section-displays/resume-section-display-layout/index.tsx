import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";
import { ReactNode } from "react";

export default function ResumeSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  const { t } = useTranslation();
  const transTitle = t(title[0] + title.slice(1).toLowerCase()).toUpperCase();

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <Typography.Title level={4} className={styles["title-text"]}>
          {transTitle}
        </Typography.Title>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
