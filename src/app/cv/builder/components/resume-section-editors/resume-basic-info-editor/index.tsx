import { useResumeEditing, useStoreBasicInfo } from "@/app/cv/builder/hooks";
import { ResumeBasicInfo } from "@/store/resume-slice";
import { Button, Form, Input, message } from "antd";

import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";

export default function ResumeBasicInfoEditor() {
  const { storeSetIsEditingResume } = useResumeEditing();
  const { storeGetBasicInfo, storeSetBasicInfo } = useStoreBasicInfo();
  const [form] = Form.useForm<ResumeBasicInfo>();
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
    <ResumeSectionEditorLayout title="Basic Information">
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
            label="Name"
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
            label="Job Title"
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
            label="Email"
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
            label="Phone"
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
            label="Location"
            rules={[
              {
                required: true,
                message: "Please input your location!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles["save-button"]}
          >
            Save
          </Button>
        </Form>
      </div>
    </ResumeSectionEditorLayout>
  );
}
