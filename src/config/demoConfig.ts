export type EmbedMode = "iframe" | "js-sdk" | "micro-app" | "wujie";

export interface DemoConfig {
  appOrigin: string;
  shareUid: string;
  token: string;
  proxy: string;
  sdkUrl: string;
}

const STORAGE_KEY = "dataluminary.share-demo.config";

/** Gallery space public share seeded by DataTalk demo (`seed-embed-share`). */
export const DEMO_SHARE_UID = "00000000-0000-4000-8000-00000000e101";
export const DEMO_SHARE_TOKEN = "dl-demo-public-embed-b001-v1";

const BROKEN_SDK_CDN =
  "https://cdn.jsdelivr.net/gh/DataLuminary/DataView@sdk-latest/packages/sdk/dist/luminary.min.js";

export function defaultSdkUrl(appOrigin: string): string {
  return `${appOrigin.replace(/\/$/, "")}/sdk/luminary.min.js`;
}

function envDefaults(): DemoConfig {
  const appOrigin = (process.env.PUBLIC_APP_ORIGIN || "http://localhost:3013").replace(/\/$/, "");
  const sdkFromEnv = (process.env.PUBLIC_SDK_CDN_URL || "").trim();
  return {
    appOrigin,
    shareUid: (process.env.PUBLIC_SHARE_UID || "").trim() || DEMO_SHARE_UID,
    token: (process.env.PUBLIC_SHARE_TOKEN || "").trim() || DEMO_SHARE_TOKEN,
    proxy: process.env.PUBLIC_PROXY || "",
    sdkUrl: sdkFromEnv && sdkFromEnv !== BROKEN_SDK_CDN ? sdkFromEnv : defaultSdkUrl(appOrigin),
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
      sdkUrl: (() => {
        const saved = String(o.sdkUrl ?? defaults.sdkUrl);
        return !saved || saved === BROKEN_SDK_CDN ? defaults.sdkUrl : saved;
      })(),
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
      return `<!-- requires @micro-zoe/micro-app. Hash routes must stay on a real iframe. -->
<script src="/vendor/micro-app.js"></script>
<script>
  const micro = window.microApp.start ? window.microApp : window.microApp.default;
  micro.start({ iframe: true, "disable-memory-router": true });
</script>
<micro-app
  name="luminary-${config.shareUid.slice(0, 8)}"
  url="${url}"
  iframe
  disable-memory-router
  style="width:100%;min-height:640px;"
></micro-app>
<script>
  const frame = document.querySelector('iframe[powered-by="micro-app"]');
  if (frame) frame.src = "${url}";
</script>`;
    case "wujie":
      return `<!-- requires wujie. Hash routes must stay on a real iframe. -->
<script src="/vendor/wujie.js"></script>
<div id="luminary-wujie" style="width:100%;min-height:640px;"></div>
<script>
  const embedUrl = "${url}";
  window.wujie.startApp({
    name: "luminary-${config.shareUid.slice(0, 8)}",
    url: embedUrl,
    el: document.querySelector("#luminary-wujie"),
    alive: false,
    degrade: true,
  });
  const frame = document.querySelector("#luminary-wujie iframe");
  if (frame) frame.src = embedUrl;
</script>`;
    default:
      return `<iframe
  src="${url}"
  style="width:100%;height:100%;min-height:640px;border:1px solid #dce0e6;"
  allow="fullscreen"
></iframe>`;
  }
}
