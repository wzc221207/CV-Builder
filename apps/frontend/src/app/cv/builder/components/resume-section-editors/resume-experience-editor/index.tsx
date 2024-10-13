import { useResumeEditing, useStoreExperience } from "@/app/cv/builder/hooks";
import { ResumeExperience } from "@/store/resume-slice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";

import RichTextEditor from "../../rich-text-editor";
import ResumeSectionEditorLayout from "../resume-section-editor-layout";
import styles from "./index.module.scss";
import ActionButton from "../../action-button";
import SectionVisibilityToggler from "../resume-visibility-toggler";

export default function ResumeExperienceEditor() {
  const { storeGetExperience, storeSetExperience } = useStoreExperience();
  const { storeSetIsEditingResume } = useResumeEditing();
  const [form] = Form.useForm<{ items: ResumeExperience }>();
  const [experience] = useState<ResumeExperience>(storeGetExperience());
  useEffect(() => {
    form.setFieldsValue({ items: experience });
  }, [experience, form]);

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        storeSetExperience(values.items);
        storeSetIsEditingResume(false);
        message.success("Changes saved successfully");
      })
      .catch(() => {
        message.error("Failed to save changes!");
      });
  }

  return (
    <ResumeSectionEditorLayout title="Experience">
      <SectionVisibilityToggler sectionName="experience" />

      <div className={styles.experience}>
        <Form form={form} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Card
                    className={styles.card}
                    size="small"
                    title={`Experience ${idx + 1}`}
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
                      name={[name, "jobTitle"]}
                      label="Job Title"
                      rules={[
                        { required: true, message: "Please input job title" },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      label="Company Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input company name",
                        },
                      ]}
                    >
                      <Input required />
                    </Form.Item>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "startDate"]}
                          label="Start Date"
                          rules={[
                            {
                              required: true,
                              message: "Please input start date",
                            },
                          ]}
                        >
                          <DatePicker picker="month" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "endDate"]}
                          label="End Date"
                          rules={[
                            {
                              required: true,
                              message: "Please input end date",
                            },
                          ]}
                        >
                          <DatePicker picker="month" />
                        </Form.Item>
                      </Col>
                    </Row>
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
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Please input description",
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
                    Add Experience
                  </ActionButton>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
      <ActionButton type="primary" onClick={handleSave}>
        Save
      </ActionButton>
    </ResumeSectionEditorLayout>
  );
}
