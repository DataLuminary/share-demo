export type Locale = "zh" | "en";

export interface Messages {
  brandSubtitle: string;
  docs: string;
  langZh: string;
  langEn: string;
  sidebarLabel: string;
  modeDesc: {
    iframe: string;
    "js-sdk": string;
    "micro-app": string;
    wujie: string;
  };
  configTitle: string;
  params: string;
  expandConfig: string;
  collapseConfig: string;
  refreshPreview: string;
  previewTitle: string;
  previewLoading: (mode: string) => string;
  previewNeedConfig: string;
  required: string;
  shareUidPlaceholder: string;
  tokenPlaceholder: string;
  proxyLabel: string;
  apply: string;
  reset: string;
  codeTitle: (mode: string) => string;
  copy: string;
  copySuccess: string;
  copyFail: string;
  applySuccess: string;
  resetSuccess: string;
  emptyConfig: string;
  loadFailed: (error: string) => string;
}

export const messages: Record<Locale, Messages> = {
  zh: {
    brandSubtitle: "四种方式嵌入仪表盘 · 实时预览",
    docs: "文档",
    langZh: "中文",
    langEn: "EN",
    sidebarLabel: "嵌入方式",
    modeDesc: {
      iframe: "原生 iframe，接入成本最低",
      "js-sdk": "官方 SDK，一键挂载容器",
      "micro-app": "micro-zoe 微前端嵌入",
      wujie: "无界微前端嵌入",
    },
    configTitle: "嵌入配置",
    params: "参数",
    expandConfig: "展开配置",
    collapseConfig: "收起配置",
    refreshPreview: "刷新预览",
    previewTitle: "嵌入预览",
    previewLoading: (mode) => `正在以 ${mode} 方式加载仪表盘`,
    previewNeedConfig: "请先填写 shareUid 与 token，然后点击应用",
    required: "必填",
    shareUidPlaceholder: "分享配置 uid",
    tokenPlaceholder: "公开访问令牌",
    proxyLabel: "proxy（可选）",
    apply: "应用并预览",
    reset: "恢复默认",
    codeTitle: (mode) => `${mode} 嵌入代码`,
    copy: "复制",
    copySuccess: "代码已复制",
    copyFail: "复制失败，请手动选择文本",
    applySuccess: "已应用配置，已展开预览",
    resetSuccess: "已恢复环境变量默认值",
    emptyConfig: "请先在上方配置 shareUid 与 token",
    loadFailed: (error) => `加载失败：${error}`,
  },
  en: {
    brandSubtitle: "Four embed modes · live preview",
    docs: "Docs",
    langZh: "中文",
    langEn: "EN",
    sidebarLabel: "Embed mode",
    modeDesc: {
      iframe: "Native iframe — lowest integration cost",
      "js-sdk": "Official SDK — mount into a container",
      "micro-app": "micro-zoe micro-frontend embed",
      wujie: "Wujie micro-frontend embed",
    },
    configTitle: "Embed config",
    params: "Parameters",
    expandConfig: "Expand config",
    collapseConfig: "Collapse config",
    refreshPreview: "Refresh preview",
    previewTitle: "Live preview",
    previewLoading: (mode) => `Loading dashboard via ${mode}`,
    previewNeedConfig: "Enter shareUid and token, then click Apply",
    required: "Required",
    shareUidPlaceholder: "Share config uid",
    tokenPlaceholder: "Public access token",
    proxyLabel: "proxy (optional)",
    apply: "Apply & preview",
    reset: "Reset defaults",
    codeTitle: (mode) => `${mode} embed code`,
    copy: "Copy",
    copySuccess: "Code copied",
    copyFail: "Copy failed — select the text manually",
    applySuccess: "Config applied — preview expanded",
    resetSuccess: "Restored env defaults",
    emptyConfig: "Configure shareUid and token above first",
    loadFailed: (error) => `Load failed: ${error}`,
  },
};

export const LOCALE_STORAGE_KEY = "dataluminary.share-demo.locale";

export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
  } catch {
    // ignore
  }
  const lang = typeof navigator !== "undefined" ? navigator.language : "zh";
  return lang.toLowerCase().startsWith("zh") ? "zh" : "en";
}
