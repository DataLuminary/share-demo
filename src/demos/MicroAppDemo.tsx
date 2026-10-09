import { Empty } from "antd";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";
import { useI18n } from "@/i18n";

interface Props {
  config: DemoConfig;
}

/** Real iframe only. Micro App rewrites the host hash router, which drops this demo back to /iframe. */
const MicroAppDemo = ({ config }: Props) => {
  const { t } = useI18n();
  if (!isConfigReady(config)) {
    return (
      <div className="sd-empty-wrap">
        <Empty description={t.emptyConfig} />
      </div>
    );
  }
  return (
    <iframe
      className="sd-demo-frame"
      title="DataLuminary Micro App"
      src={buildEmbedUrl(config)}
      allow="fullscreen"
    />
  );
};

export default MicroAppDemo;
