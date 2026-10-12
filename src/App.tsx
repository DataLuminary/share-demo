import {
  CodeOutlined,
  FileTextOutlined,
  GithubOutlined,
  GlobalOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, Select, message } from "antd";
import type { Locale as AntdLocale } from "antd/es/locale";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import frFR from "antd/locale/fr_FR";
import itIT from "antd/locale/it_IT";
import jaJP from "antd/locale/ja_JP";
import koKR from "antd/locale/ko_KR";
import nlNL from "antd/locale/nl_NL";
import ptBR from "antd/locale/pt_BR";
import zhCN from "antd/locale/zh_CN";
import zhTW from "antd/locale/zh_TW";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import ConfigBar from "@/components/ConfigBar";
import {
  DEMO_SHARE_BOARDS,
  type DemoConfig,
  type EmbedMode,
  boardForShareUid,
  clearDemoConfigOverride,
  getEnvDefaults,
  isConfigReady,
  isDemoBoardId,
  loadDemoConfig,
  resolveConfigForMode,
  saveDemoConfig,
  shareForBoard,
} from "@/config/demoConfig";
import CodePanel from "@/demos/CodePanel";
import IframeDemo from "@/demos/IframeDemo";
import JsSdkDemo from "@/demos/JsSdkDemo";
import MicroAppDemo from "@/demos/MicroAppDemo";
import WujieDemo from "@/demos/WujieDemo";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, isLocale, type Locale, useI18n } from "@/i18n";
import { boardCopy } from "@/i18n/boards";

const ANTD_LOCALE: Record<Locale, AntdLocale> = {
  en: enUS,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja: jaJP,
  ko: koKR,
  pt: ptBR,
  nl: nlNL,
  it: itIT,
  es: esES,
  fr: frFR,
};

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
  const boards = boardCopy[locale];
  const navigate = useNavigate();
  const params = useParams<{ mode?: string; board?: string }>();
  const modeParam = params.mode ?? "iframe";
  const boardParam = params.board;
  const mode: EmbedMode = MODE_SET.has(modeParam) ? (modeParam as EmbedMode) : "iframe";

  const [config, setConfig] = useState<DemoConfig>(() => {
    const loaded = loadDemoConfig();
    const initialMode: EmbedMode = MODE_SET.has(modeParam) ? (modeParam as EmbedMode) : "iframe";
    const fromUrl =
      boardParam && isDemoBoardId(boardParam)
        ? DEMO_SHARE_BOARDS.find((item) => item.id === boardParam)
        : undefined;
    const board = fromUrl ?? boardForShareUid(loaded.shareUid);
    if (!board) return resolveConfigForMode(loaded, initialMode);
    return { ...loaded, ...shareForBoard(board, initialMode) };
  });
  const [demoKey, setDemoKey] = useState(0);
  const [configCollapsed, setConfigCollapsed] = useState(false);

  const remount = useCallback(() => setDemoKey((k) => k + 1), []);

  useEffect(() => {
    if (!MODE_SET.has(modeParam)) return;
    if (boardParam && !isDemoBoardId(boardParam)) {
      navigate(`/${mode}/growth`, { replace: true });
      return;
    }
    if (!boardParam) {
      const inferred = boardForShareUid(config.shareUid)?.id;
      if (inferred) navigate(`/${mode}/${inferred}`, { replace: true });
      return;
    }
    const board = DEMO_SHARE_BOARDS.find((item) => item.id === boardParam);
    if (!board) return;
    const spec = shareForBoard(board, mode);
    setConfig((current) => {
      if (current.shareUid === spec.shareUid && current.token === spec.token) return current;
      const next = { ...current, shareUid: spec.shareUid, token: spec.token };
      saveDemoConfig(next);
      return next;
    });
  }, [mode, modeParam, boardParam, navigate, config.shareUid]);

  const antdLocale = useMemo(() => ANTD_LOCALE[locale], [locale]);

  if (!MODE_SET.has(modeParam)) {
    return <Navigate to="/iframe/growth" replace />;
  }

  const onApply = (next: DemoConfig) => {
    saveDemoConfig(next);
    setConfig(next);
    remount();
    setConfigCollapsed(true);
    const boardId = boardForShareUid(next.shareUid)?.id;
    navigate(boardId ? `/${mode}/${boardId}` : `/${mode}`, { replace: true });
    message.success(t.applySuccess);
  };

  const onReset = () => {
    clearDemoConfigOverride();
    const next = { ...getEnvDefaults(), ...shareForBoard(DEMO_SHARE_BOARDS[0], mode) };
    saveDemoConfig(next);
    setConfig(next);
    navigate(`/${mode}/growth`);
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
          <a className="sd-brand" href="#/iframe/growth">
            <img src="/logo-icon.svg" alt="DataLuminary" />
            <div className="sd-brand-title">
              <strong>DataLuminary Embed Demo</strong>
              <span>{t.brandSubtitle}</span>
            </div>
          </a>
          <div className="sd-topbar-actions">
            <Dropdown
              trigger={["click"]}
              menu={{
                selectable: true,
                selectedKeys: [locale],
                items: LOCALES.map((code) => ({
                  key: code,
                  label: LOCALE_LABELS[code],
                })),
                onClick: ({ key }) => {
                  if (isLocale(key)) setLocale(key);
                },
              }}
            >
              <button type="button" className="sd-topbar-link" aria-label={t.language}>
                <GlobalOutlined />
                <span>{LOCALE_SHORT[locale]}</span>
              </button>
            </Dropdown>
            <a className="sd-topbar-link" href={DOCS_URL} target="_blank" rel="noreferrer">
              <FileTextOutlined />
              <span>{t.docs}</span>
            </a>
            <a className="sd-topbar-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <GithubOutlined />
              <span>GitHub</span>
            </a>
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
                  onClick={() => {
                    const boardId =
                      boardParam && isDemoBoardId(boardParam)
                        ? boardParam
                        : boardForShareUid(config.shareUid)?.id;
                    navigate(boardId ? `/${key}/${boardId}` : `/${key}`);
                  }}
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
                <Select
                  size="small"
                  style={{ minWidth: 260 }}
                  aria-label={boards.shareDashboard}
                  value={boardForShareUid(config.shareUid)?.id}
                  placeholder={boards.customShare}
                  options={DEMO_SHARE_BOARDS.map((board) => ({
                    value: board.id,
                    label: `${boards.boards[board.id]} · ${
                      board.layout === "position"
                        ? boards.layoutPosition
                        : board.layout === "grid"
                          ? boards.layoutGrid
                          : boards.layoutList
                    }`,
                  }))}
                  onChange={(id) => {
                    if (!isDemoBoardId(id)) return;
                    navigate(`/${mode}/${id}`);
                  }}
                />
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
                <PreviewForMode key={`${mode}-${config.shareUid}-${demoKey}`} mode={mode} config={config} />
              </div>
            </section>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
