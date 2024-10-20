import { useResumeEditing, useStoreEducation } from "@/app/cv/builder/hooks";
import { ResumeEducation } from "@/store/resume-slice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, DatePicker, Form, Input, message } from "antd";
import { useEffect, useState } from "react";

import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";
import ActionButton from "../../action-button";
import SectionVisibilityToggler from "../resume-visibility-toggler";
import { useTranslation } from "react-i18next";

export default function ResumeEducationEditor() {
  const { storeGetEducation, storeSetEducation } = useStoreEducation();
  const { storeSetIsEditingResume } = useResumeEditing();
  const [form] = Form.useForm<{ items: ResumeEducation }>();
  const [education] = useState<ResumeEducation>(storeGetEducation());
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({ items: education });
  }, [education, form]);

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        storeSetEducation(values.items);
        storeSetIsEditingResume(false);
        message.success("Changes saved successfully");
      })
      .catch(() => {
        message.error("Failed to save changes!");
      });
  }

  return (
    <ResumeSectionEditorLayout title={t("Education")}>
      <SectionVisibilityToggler sectionName="education" />

      <div className={styles.education}>
        <Form form={form} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Card
                    className={styles.card}
                    size="small"
                    title={`${t("Education")} ${idx + 1}`}
                    key={key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label={t("University")}
                      rules={[
                        {
                          required: true,
                          message: "Please input university name",
                        },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "major"]}
                      label={t("Major")}
                      rules={[
                        {
                          required: true,
                          message: "Please input major name",
                        },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "graduationDate"]}
                      label={t("Graduation Date")}
                      rules={[
                        {
                          required: true,
                          message: "Please input graduation date",
                        },
                      ]}
                    >
                      <DatePicker picker="month" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "location"]}
                      label={t("Location")}
                      rules={[
                        {
                          required: true,
                          message: "Please input location",
                        },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <ActionButton
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    {t("Add Education History")}
                  </ActionButton>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>

      <ActionButton type="primary" onClick={handleSave}>
        {t("Save")}
      </ActionButton>
    </ResumeSectionEditorLayout>
  );
}
