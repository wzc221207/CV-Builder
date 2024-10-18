import { useResumeEditing, useStoreLanguages } from "@/app/cv/builder/hooks";
import { Card, Form, Input, message } from "antd";
import { type ResumeLanguages } from "@/store/resume-slice";
import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ActionButton from "../../action-button";
import SectionVisibilityToggler from "../resume-visibility-toggler";
import { useTranslation } from "react-i18next";

export default function ResumeLanguagesEditor() {
  const { storeGetLanguages, storeSetLanguages } = useStoreLanguages();
  const { storeSetIsEditingResume } = useResumeEditing();
  const [form] = Form.useForm<{ items: ResumeLanguages }>();
  const [languages] = useState<ResumeLanguages>(storeGetLanguages());
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({ items: languages });
  }, [languages, form]);

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        storeSetLanguages(values.items);
        storeSetIsEditingResume(false);
        message.success("Changes saved successfully");
      })
      .catch(() => {
        message.error("Failed to save changes!");
      });
  }

  return (
    <ResumeSectionEditorLayout title={t("Languages")}>
      <SectionVisibilityToggler sectionName="languages" />

      <div className={styles.languages}>
        <Form form={form} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Card
                    className={styles.card}
                    size="small"
                    title={`${t("Language")} ${idx + 1}`}
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
                      label={t("Language Name")}
                      rules={[
                        {
                          required: true,
                          message: "Please input language name",
                        },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "level"]}
                      label={t("Level")}
                      rules={[
                        {
                          required: true,
                          message: "Please input language level",
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
                    {t("Add Language")}
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
