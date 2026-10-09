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

/** One seeded public share per embed mode, same dashboard. */
export const DEMO_EMBEDS: Record<EmbedMode, { shareUid: string; token: string }> = {
  iframe: { shareUid: DEMO_SHARE_UID, token: DEMO_SHARE_TOKEN },
  "js-sdk": {
    shareUid: "00000000-0000-4000-8000-00000000e102",
    token: "dl-demo-public-embed-b001-jssdk",
  },
  "micro-app": {
    shareUid: "00000000-0000-4000-8000-00000000e103",
    token: "dl-demo-public-embed-b001-micro",
  },
  wujie: {
    shareUid: "00000000-0000-4000-8000-00000000e104",
    token: "dl-demo-public-embed-b001-wujie",
  },
};

const DEMO_SHARE_UIDS = new Set(Object.values(DEMO_EMBEDS).map((item) => item.shareUid));

/** Keep a pasted product share; switch the seeded demo share to match the mode. */
export function resolveConfigForMode(config: DemoConfig, mode: EmbedMode): DemoConfig {
  if (config.shareUid && !DEMO_SHARE_UIDS.has(config.shareUid)) return config;
  const spec = DEMO_EMBEDS[mode];
  return { ...config, shareUid: spec.shareUid, token: spec.token };
}

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

const RETIRED_APP_SHARE_UID = "01a11a3e-043f-7112-8622-51a4d4b00e7c";

export function loadDemoConfig(): DemoConfig {
  const defaults = envDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaults;
    const o = parsed as Record<string, unknown>;
    const shareUid = String(o.shareUid ?? defaults.shareUid);
    if (shareUid === RETIRED_APP_SHARE_UID) {
      localStorage.removeItem(STORAGE_KEY);
      return defaults;
    }
    return {
      appOrigin: String(o.appOrigin ?? defaults.appOrigin).replace(/\/$/, ""),
      shareUid,
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
      return `<!-- requires @micro-zoe/micro-app -->
<script src="https://cdn.jsdelivr.net/npm/@micro-zoe/micro-app@1.0.0-rc.27/lib/index.umd.js"></script>
<script>
  var micro = window.microApp && (window.microApp.default || window.microApp);
  if (micro) micro.start({ iframe: true, "router-mode": "pure" });
</script>
<micro-app
  name="luminary-dashboard"
  url="${url}"
  iframe
  router-mode="pure"
  style="width:100%;min-height:640px;"
></micro-app>`;
    case "wujie":
      return `<!-- requires wujie -->
<script src="https://cdn.jsdelivr.net/npm/wujie@2.1.0/lib/index.js"></script>
<div id="luminary-wujie" style="width:100%;min-height:640px;"></div>
<script>
  window.wujie.startApp({
    name: "luminary-dashboard",
    url: "${url}",
    el: document.querySelector("#luminary-wujie"),
    alive: false,
    degrade: true,
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
