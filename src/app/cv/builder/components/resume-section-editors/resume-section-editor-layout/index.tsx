import { Space, Typography } from "antd";
import { CaretLeftFilled } from "@ant-design/icons";
import { setIsEditingResume } from "@/store/resume-slice";
import { useAppDispatch } from "@/store";

import styles from "./index.module.scss";

export default function ResumeSectionEditorLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  return (
    <>
      <header className={styles.header}>
        <Typography.Title level={3}>
          <Space size="middle">
            <CaretLeftFilled
              className={styles["left-arrow"]}
              onClick={() => dispatch(setIsEditingResume(false))}
            />
            {title}
          </Space>
        </Typography.Title>
      </header>
      {children}
    </>
  );
}
