"use client";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import styles from "./page.module.scss";

function Tagline({ language }: { language: string }) {
  if (language == "zh") {
    return (
      <>
        一个免费且开源的<span>简历</span>制作工具
      </>
    );
  }

  return (
    <>
      A Free and Open Source Tool to Help Build Professional{" "}
      <span>Resumes</span> Easily
    </>
  );
}

export default function Home() {
  const { t } = useTranslation();
  return (
    <main>
      <section className={styles.hero}>
        <Title level={3}>CV Builder</Title>
        <Title level={3} className={styles.descrption}>
          <Tagline language={i18n.language} />
        </Title>
        <div className={styles.actions}>
          <Link
            href="/cv/builder"
            className={styles["action-button"]}
            prefetch={true}
          >
            {t("Get Started")}
          </Link>
        </div>
      </section>
    </main>
  );
}
