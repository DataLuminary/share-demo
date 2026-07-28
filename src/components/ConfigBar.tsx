import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import type { DemoConfig, EmbedMode } from "@/config/demoConfig";
import { getEnvDefaults } from "@/config/demoConfig";
import { useI18n } from "@/i18n";

interface Props {
  value: DemoConfig;
  mode: EmbedMode;
  onApply: (next: DemoConfig) => void;
  onReset: () => void;
}

const ConfigBar = ({ value, mode, onApply, onReset }: Props) => {
  const { t } = useI18n();
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
    <Form form={form} layout="vertical" initialValues={value} requiredMark="optional" size="small">
      <div className="sd-form-grid">
        <Form.Item
          name="appOrigin"
          label="appOrigin"
          rules={[{ required: true, message: t.required }]}
        >
          <Input placeholder="https://app.dataluminary.dev" />
        </Form.Item>
        <Form.Item
          name="shareUid"
          label="shareUid"
          rules={[{ required: true, message: t.required }]}
        >
          <Input placeholder={t.shareUidPlaceholder} />
        </Form.Item>
        <Form.Item name="token" label="token" rules={[{ required: true, message: t.required }]}>
          <Input.Password placeholder={t.tokenPlaceholder} visibilityToggle />
        </Form.Item>
        <Form.Item name="proxy" label={t.proxyLabel}>
          <Input placeholder="https://your-domain.com/datatalk" />
        </Form.Item>
        {mode === "js-sdk" ? (
          <Form.Item
            name="sdkUrl"
            label="SDK CDN"
            className="sd-span-2"
            style={{ gridColumn: "1 / -1" }}
          >
            <Input placeholder="https://cdn.jsdelivr.net/gh/..." />
          </Form.Item>
        ) : null}
      </div>
      <div className="sd-config-actions">
        <Button type="primary" onClick={() => void submit()}>
          {t.apply}
        </Button>
        <Button onClick={onReset}>{t.reset}</Button>
      </div>
    </Form>
  );
};

export default ConfigBar;
