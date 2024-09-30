import Title from "antd/es/typography/Title";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <Title level={2}>CV Builder</Title>
        <Title level={3} className={styles.descrption}>
          A Free Tool to Help Build Professional <span>Resumes</span> With Ease
        </Title>
        <div className={styles.actions}>
          <Link
            href="/cv/builder"
            className={styles["action-button"]}
            prefetch={true}
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
