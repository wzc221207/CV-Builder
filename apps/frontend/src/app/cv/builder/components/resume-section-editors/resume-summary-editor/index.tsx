import { Form, message } from "antd";
import { useResumeEditing, useStoreSummary } from "@/app/cv/builder/hooks";

import styles from "./index.module.scss";
import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import { type ResumeSummary } from "@/store/resume-slice";
import RichTextEditor from "../../rich-text-editor";
import ActionButton from "../../action-button";
import SectionVisibilityToggler from "../resume-visibility-toggler";
import { useTranslation } from "react-i18next";

export default function ResumeSummaryEditor() {
  const { storeSetIsEditingResume } = useResumeEditing();
  const { storeGetSummary, storeSetSummary } = useStoreSummary();
  const [form] = Form.useForm<ResumeSummary>();
  const { t } = useTranslation();

  form.setFieldsValue(storeGetSummary());

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        storeSetSummary(values);
        storeSetIsEditingResume(false);
        message.success("Changes saved successfully");
      })
      .catch(() => {
        message.error("Failed to save changes!");
      });
  }

  return (
    <ResumeSectionEditorLayout title={t("Summary")}>
      <SectionVisibilityToggler sectionName="summary" />
      <div className={styles["form-container"]}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSave}
          className={styles["form"]}
        >
          <Form.Item
            name="selfSummary"
            label={t("Self Summary")}
            rules={[
              {
                required: true,
                message: "Please input your summary!",
              },
            ]}
          >
            <RichTextEditor />
          </Form.Item>
          <ActionButton type="primary" htmlType="submit">
            {t("Save")}
          </ActionButton>
        </Form>
      </div>
    </ResumeSectionEditorLayout>
  );
}
