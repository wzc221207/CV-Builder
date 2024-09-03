import { Typography } from "antd";

import styles from "./index.module.scss";
import { ReactNode } from "react";

export default function ResumeSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <Typography.Title level={4} className={styles["title-text"]}>
          {title}
        </Typography.Title>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
