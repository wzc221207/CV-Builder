import { useResumeEditing, useStoreBasicInfo } from "@/app/cv/builder/hooks";
import { ResumeBasicInfo } from "@/store/resume-slice";
import { Form, Input, message } from "antd";

import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";
import ActionButton from "../../action-button";
import { useTranslation } from "react-i18next";

export default function ResumeBasicInfoEditor() {
  const { storeSetIsEditingResume } = useResumeEditing();
  const { storeGetBasicInfo, storeSetBasicInfo } = useStoreBasicInfo();
  const [form] = Form.useForm<ResumeBasicInfo>();
  const { t } = useTranslation();

  form.setFieldsValue(storeGetBasicInfo());

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        storeSetBasicInfo(values);
        storeSetIsEditingResume(false);
        message.success("Changes saved successfully");
      })
      .catch(() => {
        message.error("Failed to save changes!");
      });
  }

  return (
    <ResumeSectionEditorLayout title={t("Basic Information")}>
      <div className={styles["form-container"]}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSave}
          className={styles.form}
        >
          <Form.Item
            name="name"
            label={t("Name")}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Form.Item
            name="jobTitle"
            label={t("Job Title")}
            rules={[
              {
                required: true,
                message: "Please input your job title!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Form.Item
            name="email"
            label={t("Email")}
            rules={[
              {
                type: "email",
                message: "This is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t("Phone")}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Form.Item
            name="location"
            label={t("Location")}
            rules={[
              {
                required: true,
                message: "Please input your location!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <ActionButton type="primary" htmlType="submit">
            {t("Save")}
          </ActionButton>
        </Form>
      </div>
    </ResumeSectionEditorLayout>
  );
}
