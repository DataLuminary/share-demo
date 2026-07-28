import { Empty } from "antd";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";

interface Props {
  config: DemoConfig;
}

const IframeDemo = ({ config }: Props) => {
  if (!isConfigReady(config)) {
    return <Empty description="请先配置 shareUid 与 token" />;
  }
  return (
    <iframe
      className="sd-demo-frame"
      title="DataLuminary iframe embed"
      src={buildEmbedUrl(config)}
      allow="fullscreen"
    />
  );
};

export default IframeDemo;
