import { useResumeEditing, useStoreEducation } from "@/app/cv/builder/hooks";
import { ResumeEducation } from "@/store/resume-slice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, message } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";

import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";

export default function ResumeEducationEditor() {
  const { storeGetEducation, storeSetEducation } = useStoreEducation();
  const { storeSetIsEditingResume } = useResumeEditing();
  const [form] = Form.useForm<{ items: ResumeEducation }>();
  const [education] = useState<ResumeEducation>(storeGetEducation());
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
    <ResumeSectionEditorLayout title="Education">
      <div className={styles.education}>
        <Form form={form} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Card
                    className={styles.card}
                    size="small"
                    title={`Education ${idx + 1}`}
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
                      label="University"
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
                      label="Major"
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
                      label="Graduation Date"
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
                      label="Location"
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
                  <Button
                    type="dashed"
                    className={clsx([styles["button"], styles["add-button"]])}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Education
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
