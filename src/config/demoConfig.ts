export type EmbedMode = "iframe" | "js-sdk" | "micro-app" | "wujie";

export interface DemoConfig {
  appOrigin: string;
  shareUid: string;
  token: string;
  proxy: string;
  sdkUrl: string;
}

const STORAGE_KEY = "dataluminary.share-demo.config";

const DEFAULT_SDK_CDN =
  "https://cdn.jsdelivr.net/gh/DataLuminary/DataView@sdk-latest/packages/sdk/dist/luminary.min.js";

function envDefaults(): DemoConfig {
  return {
    appOrigin: (process.env.PUBLIC_APP_ORIGIN || "https://app.dataluminary.dev").replace(/\/$/, ""),
    shareUid: process.env.PUBLIC_SHARE_UID || "",
    token: process.env.PUBLIC_SHARE_TOKEN || "",
    proxy: process.env.PUBLIC_PROXY || "",
    sdkUrl: process.env.PUBLIC_SDK_CDN_URL || DEFAULT_SDK_CDN,
  };
}

export function getEnvDefaults(): DemoConfig {
  return envDefaults();
}

export function loadDemoConfig(): DemoConfig {
  const defaults = envDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaults;
    const o = parsed as Record<string, unknown>;
    return {
      appOrigin: String(o.appOrigin ?? defaults.appOrigin).replace(/\/$/, ""),
      shareUid: String(o.shareUid ?? defaults.shareUid),
      token: String(o.token ?? defaults.token),
      proxy: String(o.proxy ?? defaults.proxy),
      sdkUrl: String(o.sdkUrl ?? defaults.sdkUrl) || DEFAULT_SDK_CDN,
    };
  } catch {
    return defaults;
  }
}

export function saveDemoConfig(config: DemoConfig): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...config,
      appOrigin: config.appOrigin.replace(/\/$/, ""),
    }),
  );
}

export function clearDemoConfigOverride(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function buildEmbedUrl(config: DemoConfig): string {
  const base = `${config.appOrigin.replace(/\/$/, "")}/#/embed/share/${encodeURIComponent(config.shareUid)}`;
  const params = new URLSearchParams({ token: config.token });
  if (config.proxy.trim()) params.set("proxy", config.proxy.trim());
  return `${base}?${params.toString()}`;
}

export function isConfigReady(config: DemoConfig): boolean {
  return Boolean(config.shareUid.trim() && config.token.trim() && config.appOrigin.trim());
}

export function buildShareSnippet(mode: EmbedMode, config: DemoConfig): string {
  const url = buildEmbedUrl(config);
  switch (mode) {
    case "js-sdk": {
      const proxyLine = config.proxy.trim()
        ? `  proxy: "${config.proxy.trim()}",`
        : `  // proxy: "https://your-domain.com/datatalk",`;
      return `<div id="luminary-dashboard" style="width:100%;min-height:640px;"></div>
<script src="${config.sdkUrl}"></script>
<script>
  window.Luminary.embed({
    container: "#luminary-dashboard",
${proxyLine}
    token: "${config.token}",
    dashboard: "${config.shareUid}",
    appOrigin: "${config.appOrigin.replace(/\/$/, "")}",
  });
</script>`;
    }
    case "micro-app":
      return `<!-- requires @micro-zoe/micro-app -->
<script src="https://cdn.jsdelivr.net/npm/@micro-zoe/micro-app/lib/index.umd.js"></script>
<script>microApp.start()</script>
<micro-app
  name="luminary-${config.shareUid.slice(0, 8)}"
  url="${url}"
  iframe
  style="width:100%;min-height:640px;"
></micro-app>`;
    case "wujie":
      return `<!-- requires wujie -->
<script src="https://cdn.jsdelivr.net/npm/wujie@1/lib/index.umd.js"></script>
<div id="luminary-wujie" style="width:100%;min-height:640px;"></div>
<script>
  window.Wujie.startApp({
    name: "luminary-${config.shareUid.slice(0, 8)}",
    url: "${url}",
    el: document.querySelector("#luminary-wujie"),
    alive: true,
  });
</script>`;
    default:
      return `<iframe
  src="${url}"
  style="width:100%;height:100%;min-height:640px;border:1px solid #dce0e6;"
  allow="fullscreen"
></iframe>`;
  }
}
