import { EnvironmentFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";

import { useStoreBasicInfo } from "../../../hooks";
import styles from "./index.module.scss";

export default function ResumeBasicInfo() {
  const { storeGetBasicInfo } = useStoreBasicInfo();
  const basicInfo = storeGetBasicInfo();

  return (
    <header className={styles["baisc-info"]}>
      <Typography.Title level={2} className={styles.name}>
        {basicInfo.name}
      </Typography.Title>
      <Typography.Title level={5} className={styles["job-title"]}>
        {basicInfo.jobTitle}
      </Typography.Title>
      <Row>
        <Col span={8}>
          <Typography.Text>
            <Space>
              <MailFilled />
              <span>{basicInfo.email}</span>
            </Space>
          </Typography.Text>
        </Col>
        <Col span={8}>
          <Typography.Text>
            <Space>
              <PhoneFilled />
              <span>{basicInfo.phone}</span>
            </Space>
          </Typography.Text>
        </Col>
        <Col span={8}>
          <Typography.Text>
            <Space>
              <EnvironmentFilled />
              <span>{basicInfo.location}</span>
            </Space>
          </Typography.Text>
        </Col>
      </Row>
    </header>
  );
}
