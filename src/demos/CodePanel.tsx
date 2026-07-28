import { CopyOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import type { DemoConfig, EmbedMode } from "@/config/demoConfig";
import { buildShareSnippet } from "@/config/demoConfig";
import { useI18n } from "@/i18n";

interface Props {
  mode: EmbedMode;
  config: DemoConfig;
}

const MODE_LABEL: Record<EmbedMode, string> = {
  iframe: "iframe",
  "js-sdk": "JS SDK",
  "micro-app": "Micro App",
  wujie: "Wujie",
};

const CodePanel = ({ mode, config }: Props) => {
  const { t } = useI18n();
  const code = buildShareSnippet(mode, config);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      message.success(t.copySuccess);
    } catch {
      message.error(t.copyFail);
    }
  };

  return (
    <div className="sd-code">
      <div className="sd-config-section-title">
        <span>{t.codeTitle(MODE_LABEL[mode])}</span>
        <Button size="small" icon={<CopyOutlined />} onClick={() => void onCopy()}>
          {t.copy}
        </Button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodePanel;
