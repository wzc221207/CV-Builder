import { useResumeEditing, useStoreLanguages } from "@/app/cv/builder/hooks";
import { Button, Card, Form, Input, message } from "antd";
import { type ResumeLanguages } from "@/store/resume-slice";
import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ResumeLanguagesEditor() {
  const { storeGetLanguages, storeSetLanguages } = useStoreLanguages();
  const { storeSetIsEditingResume } = useResumeEditing();
  const [form] = Form.useForm<{ items: ResumeLanguages }>();
  const [languages] = useState<ResumeLanguages>(storeGetLanguages());
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
    <ResumeSectionEditorLayout title="Languages">
      <div className={styles.languages}>
        <Form form={form} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Card
                    className={styles.card}
                    size="small"
                    title={`language ${idx + 1}`}
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
                      label="name"
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
                      label="Level"
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
                  <Button
                    type="dashed"
                    className={clsx([styles["button"], styles["add-button"]])}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Language
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>

      <Button type="primary" className={styles["button"]} onClick={handleSave}>
        Save
      </Button>
    </ResumeSectionEditorLayout>
  );
}
