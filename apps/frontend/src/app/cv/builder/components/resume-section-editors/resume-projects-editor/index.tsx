import { useResumeEditing, useStoreProjects } from "@/app/cv/builder/hooks";
import { Card, Form, Input, message } from "antd";
import { type ResumeProjects } from "@/store/resume-slice";
import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import RichTextEditor from "../../rich-text-editor";
import ActionButton from "../../action-button";
import SectionVisibilityToggler from "../resume-visibility-toggler";
import { useTranslation } from "react-i18next";

export default function ResumeProjectsEditor() {
  const { storeGetProjects, storeSetProjects } = useStoreProjects();
  const { storeSetIsEditingResume } = useResumeEditing();
  const [form] = Form.useForm<{ items: ResumeProjects }>();
  const [projects] = useState<ResumeProjects>(storeGetProjects());
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({ items: projects });
  }, [projects, form]);

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        storeSetProjects(values.items);
        storeSetIsEditingResume(false);
        message.success("Changes saved successfully");
      })
      .catch(() => {
        message.error("Failed to save changes!");
      });
  }

  return (
    <ResumeSectionEditorLayout title={t("Projects")}>
      <SectionVisibilityToggler sectionName="projects" />
      <div className={styles.projects}>
        <Form form={form} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Card
                    className={styles.card}
                    size="small"
                    title={`${t("Project")} ${idx + 1}`}
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
                      name={[name, "title"]}
                      label={t("Title")}
                      rules={[
                        {
                          required: true,
                          message: "Please input project title",
                        },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label={t("Description")}
                      rules={[
                        {
                          required: true,
                          message: "Please input project description",
                        },
                      ]}
                    >
                      <RichTextEditor />
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <ActionButton
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    {t("Add Project")}
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
