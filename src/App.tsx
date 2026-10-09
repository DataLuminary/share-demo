import {
  CodeOutlined,
  GithubOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Segmented, message } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import ConfigBar from "@/components/ConfigBar";
import {
  type DemoConfig,
  type EmbedMode,
  clearDemoConfigOverride,
  getEnvDefaults,
  isConfigReady,
  loadDemoConfig,
  resolveConfigForMode,
  saveDemoConfig,
} from "@/config/demoConfig";
import CodePanel from "@/demos/CodePanel";
import IframeDemo from "@/demos/IframeDemo";
import JsSdkDemo from "@/demos/JsSdkDemo";
import MicroAppDemo from "@/demos/MicroAppDemo";
import WujieDemo from "@/demos/WujieDemo";
import { type Locale, useI18n } from "@/i18n";

const GITHUB_URL = "https://github.com/DataLuminary/share-demo";
const DOCS_URL = "https://docs.dataluminary.dev/share/embed";

const MODE_KEYS: EmbedMode[] = ["iframe", "js-sdk", "micro-app", "wujie"];
const MODE_LABEL: Record<EmbedMode, string> = {
  iframe: "iframe",
  "js-sdk": "JS SDK",
  "micro-app": "Micro App",
  wujie: "Wujie",
};
const MODE_SET = new Set<string>(MODE_KEYS);

function PreviewForMode({ mode, config }: { mode: EmbedMode; config: DemoConfig }) {
  switch (mode) {
    case "js-sdk":
      return <JsSdkDemo config={config} />;
    case "micro-app":
      return <MicroAppDemo config={config} />;
    case "wujie":
      return <WujieDemo config={config} />;
    default:
      return <IframeDemo config={config} />;
  }
}

const App = () => {
  const { locale, t, setLocale } = useI18n();
  const navigate = useNavigate();
  const params = useParams<{ mode?: string }>();
  const modeParam = params.mode ?? "iframe";
  const mode: EmbedMode = MODE_SET.has(modeParam) ? (modeParam as EmbedMode) : "iframe";

  const [config, setConfig] = useState<DemoConfig>(() => resolveConfigForMode(loadDemoConfig(), mode));
  const [demoKey, setDemoKey] = useState(0);
  const [configCollapsed, setConfigCollapsed] = useState(false);

  const remount = useCallback(() => setDemoKey((k) => k + 1), []);

  useEffect(() => {
    setConfig((current) => resolveConfigForMode(current, mode));
  }, [mode]);

  const antdLocale = useMemo(() => (locale === "zh" ? zhCN : enUS), [locale]);

  if (!MODE_SET.has(modeParam)) {
    return <Navigate to="/iframe" replace />;
  }

  const onApply = (next: DemoConfig) => {
    saveDemoConfig(next);
    setConfig(next);
    remount();
    setConfigCollapsed(true);
    message.success(t.applySuccess);
  };

  const onReset = () => {
    clearDemoConfigOverride();
    setConfig(resolveConfigForMode(getEnvDefaults(), mode));
    remount();
    message.success(t.resetSuccess);
  };

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          colorPrimary: "#3A84FF",
          colorInfo: "#3A84FF",
          colorTextBase: "#0A1020",
          borderRadius: 6,
          controlHeight: 32,
          fontSize: 13,
        },
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      <div className="sd-app">
        <header className="sd-topbar">
          <a className="sd-brand" href="#/iframe">
            <img src="/logo-icon.svg" alt="DataLuminary" />
            <div className="sd-brand-title">
              <strong>DataLuminary Embed Demo</strong>
              <span>{t.brandSubtitle}</span>
            </div>
          </a>
          <div className="sd-topbar-actions">
            <Segmented
              size="small"
              value={locale}
              onChange={(value) => setLocale(value as Locale)}
              options={[
                { label: t.langZh, value: "zh" },
                { label: t.langEn, value: "en" },
              ]}
            />
            <Button size="small" href={DOCS_URL} target="_blank" rel="noreferrer">
              {t.docs}
            </Button>
            <Button
              size="small"
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

        <div className="sd-body">
          <aside className="sd-sidebar">
            <div className="sd-sidebar-label">{t.sidebarLabel}</div>
            <nav className="sd-nav">
              {MODE_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`sd-nav-item${mode === key ? " is-active" : ""}`}
                  onClick={() => navigate(`/${key}`)}
                >
                  <strong>{MODE_LABEL[key]}</strong>
                  <span>{t.modeDesc[key]}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="sd-main">
            <section className="sd-config-panel">
              <div className="sd-config-head">
                <h2>
                  {t.configTitle}
                  <span className="sd-mode-tag">{MODE_LABEL[mode]}</span>
                </h2>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    size="small"
                    icon={<CodeOutlined />}
                    onClick={() => setConfigCollapsed((v) => !v)}
                  >
                    {configCollapsed ? t.expandConfig : t.collapseConfig}
                  </Button>
                  <Button size="small" icon={<ReloadOutlined />} onClick={remount}>
                    {t.refreshPreview}
                  </Button>
                </div>
              </div>
              {!configCollapsed ? (
                <div className="sd-config-body">
                  <div className="sd-config-form">
                    <div className="sd-config-section-title">{t.params}</div>
                    <ConfigBar
                      value={config}
                      mode={mode}
                      onApply={onApply}
                      onReset={onReset}
                    />
                  </div>
                  <div className="sd-config-code">
                    <CodePanel mode={mode} config={config} />
                  </div>
                </div>
              ) : null}
            </section>

            <section className="sd-preview">
              <div className="sd-preview-head">
                <h3>{t.previewTitle}</h3>
                <span className="sd-muted">
                  {isConfigReady(config)
                    ? t.previewLoading(MODE_LABEL[mode])
                    : t.previewNeedConfig}
                </span>
              </div>
              <div className="sd-preview-body">
                <PreviewForMode key={`${mode}-${demoKey}`} mode={mode} config={config} />
              </div>
            </section>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
