import { Empty } from "antd";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";
import { useI18n } from "@/i18n";

interface Props {
  config: DemoConfig;
}

/** Real iframe only. Wujie keeps a loading shell and rewrites the host location on a hash route. */
const WujieDemo = ({ config }: Props) => {
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
      title="DataLuminary Wujie"
      src={buildEmbedUrl(config)}
      allow="fullscreen"
    />
  );
};

export default WujieDemo;
