import { CopyOutlined } from "@ant-design/icons";
import { Button, message, Typography } from "antd";
import type { DemoConfig, EmbedMode } from "@/config/demoConfig";
import { buildShareSnippet } from "@/config/demoConfig";

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
  const code = buildShareSnippet(mode, config);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      message.success("代码已复制");
    } catch {
      message.error("复制失败，请手动选择文本");
    }
  };

  return (
    <div className="sd-card sd-code">
      <div className="sd-code-toolbar">
        <Typography.Text strong>{MODE_LABEL[mode]} 嵌入代码</Typography.Text>
        <Button size="small" icon={<CopyOutlined />} onClick={() => void onCopy()}>
          复制
        </Button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodePanel;
