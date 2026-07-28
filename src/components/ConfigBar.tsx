import { Button, Form, Input, Space, Typography } from "antd";
import { useEffect } from "react";
import type { DemoConfig } from "@/config/demoConfig";
import { getEnvDefaults } from "@/config/demoConfig";

interface Props {
  value: DemoConfig;
  onApply: (next: DemoConfig) => void;
  onReset: () => void;
}

const ConfigBar = ({ value, onApply, onReset }: Props) => {
  const [form] = Form.useForm<DemoConfig>();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  const submit = async () => {
    const values = await form.validateFields();
    onApply({
      appOrigin: values.appOrigin.trim().replace(/\/$/, ""),
      shareUid: values.shareUid.trim(),
      token: values.token.trim(),
      proxy: (values.proxy ?? "").trim(),
      sdkUrl: (values.sdkUrl ?? getEnvDefaults().sdkUrl).trim(),
    });
  };

  return (
    <div className="sd-card">
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        嵌入配置
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
        默认值来自环境变量（PUBLIC_SHARE_UID / TOKEN 等）。可在此覆盖并保存到本机
        localStorage；「恢复默认」清除覆盖。
      </Typography.Paragraph>
      <Form form={form} layout="vertical" initialValues={value} requiredMark="optional">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          <Form.Item
            name="appOrigin"
            label="appOrigin"
            rules={[{ required: true, message: "必填" }]}
          >
            <Input placeholder="https://app.dataluminary.dev" />
          </Form.Item>
          <Form.Item
            name="shareUid"
            label="shareUid"
            rules={[{ required: true, message: "必填" }]}
          >
            <Input placeholder="分享配置 uid" />
          </Form.Item>
          <Form.Item name="token" label="token" rules={[{ required: true, message: "必填" }]}>
            <Input.Password placeholder="公开访问令牌" visibilityToggle />
          </Form.Item>
          <Form.Item name="proxy" label="proxy（可选）">
            <Input placeholder="https://your-domain.com/datatalk" />
          </Form.Item>
          <Form.Item name="sdkUrl" label="SDK CDN（js-sdk）" style={{ gridColumn: "1 / -1" }}>
            <Input placeholder="https://cdn.jsdelivr.net/gh/..." />
          </Form.Item>
        </div>
        <Space>
          <Button type="primary" onClick={() => void submit()}>
            应用
          </Button>
          <Button onClick={onReset}>恢复默认</Button>
        </Space>
      </Form>
    </div>
  );
};

export default ConfigBar;
