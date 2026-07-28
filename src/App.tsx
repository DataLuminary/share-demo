import { GithubOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Tabs, Typography, message } from "antd";
import { useCallback, useMemo, useState } from "react";
import ConfigBar from "@/components/ConfigBar";
import {
  type DemoConfig,
  type EmbedMode,
  clearDemoConfigOverride,
  getEnvDefaults,
  loadDemoConfig,
  saveDemoConfig,
} from "@/config/demoConfig";
import CodePanel from "@/demos/CodePanel";
import IframeDemo from "@/demos/IframeDemo";
import JsSdkDemo from "@/demos/JsSdkDemo";
import MicroAppDemo from "@/demos/MicroAppDemo";
import WujieDemo from "@/demos/WujieDemo";

const GITHUB_URL = "https://github.com/DataLuminary/share-demo";
const DOCS_URL = "https://docs.dataluminary.dev/share/embed";

const App = () => {
  const [config, setConfig] = useState<DemoConfig>(() => loadDemoConfig());
  const [mode, setMode] = useState<EmbedMode>("iframe");
  const [demoKey, setDemoKey] = useState(0);

  const remount = useCallback(() => setDemoKey((k) => k + 1), []);

  const onApply = (next: DemoConfig) => {
    saveDemoConfig(next);
    setConfig(next);
    remount();
    message.success("已应用配置");
  };

  const onReset = () => {
    clearDemoConfigOverride();
    const defaults = getEnvDefaults();
    setConfig(defaults);
    remount();
    message.success("已恢复环境变量默认值");
  };

  const tabItems = useMemo(
    () => [
      {
        key: "iframe",
        label: "iframe",
        children: (
          <>
            <IframeDemo key={`iframe-${demoKey}`} config={config} />
            <div style={{ height: 16 }} />
            <CodePanel mode="iframe" config={config} />
          </>
        ),
      },
      {
        key: "js-sdk",
        label: "JS SDK",
        children: (
          <>
            <JsSdkDemo key={`js-sdk-${demoKey}`} config={config} />
            <div style={{ height: 16 }} />
            <CodePanel mode="js-sdk" config={config} />
          </>
        ),
      },
      {
        key: "micro-app",
        label: "Micro App",
        children: (
          <>
            <MicroAppDemo key={`micro-app-${demoKey}`} config={config} />
            <div style={{ height: 16 }} />
            <CodePanel mode="micro-app" config={config} />
          </>
        ),
      },
      {
        key: "wujie",
        label: "Wujie",
        children: (
          <>
            <WujieDemo key={`wujie-${demoKey}`} config={config} />
            <div style={{ height: 16 }} />
            <CodePanel mode="wujie" config={config} />
          </>
        ),
      },
    ],
    [config, demoKey],
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3A84FF",
          colorInfo: "#3A84FF",
          colorTextBase: "#0A1020",
          borderRadius: 6,
        },
      }}
    >
      <div className="sd-shell">
        <header className="sd-header">
          <a className="sd-brand" href="/">
            <img src="/logo-icon.svg" alt="DataLuminary" />
            <div className="sd-brand-title">
              <strong>DataLuminary Embed Demo</strong>
              <span>iframe · JS SDK · Micro App · Wujie</span>
            </div>
          </a>
          <div className="sd-header-actions">
            <Button href={DOCS_URL} target="_blank" rel="noreferrer">
              文档
            </Button>
            <Button
              type="primary"
              icon={<GithubOutlined />}
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Button>
          </div>
        </header>

        <Typography.Paragraph className="sd-muted" style={{ marginBottom: 16 }}>
          独立演示站，展示仪表盘四种嵌入方式。默认 uid / token 来自构建环境变量；你也可以填入自己的分享配置做联调。
          发布地址：
          <a href="https://demo.dataluminary.dev" target="_blank" rel="noreferrer">
            demo.dataluminary.dev
          </a>
        </Typography.Paragraph>

        <ConfigBar value={config} onApply={onApply} onReset={onReset} />

        <div className="sd-card">
          <Tabs
            activeKey={mode}
            onChange={(key) => setMode(key as EmbedMode)}
            items={tabItems}
            destroyOnHidden
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
