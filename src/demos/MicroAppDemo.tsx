import { Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";
import { useI18n } from "@/i18n";
import { loadScript } from "./loadScript";

interface Props {
  config: DemoConfig;
}

interface MicroAppApi {
  start: () => void;
}

declare global {
  interface Window {
    microApp?: MicroAppApi & { default?: MicroAppApi };
  }
}

function resolveMicroApp(): MicroAppApi | undefined {
  const raw = window.microApp;
  if (raw && typeof raw.start === "function") return raw;
  if (raw?.default && typeof raw.default.start === "function") return raw.default;
  return undefined;
}

const MICRO_APP_CDN = "/vendor/micro-app.js";

const MicroAppDemo = ({ config }: Props) => {
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigReady(config) || !hostRef.current) return;
    let cancelled = false;
    const elName = `luminary-${config.shareUid.slice(0, 8)}`;

    void (async () => {
      try {
        setError(null);
        await loadScript(MICRO_APP_CDN, "microApp");
        if (cancelled || !hostRef.current) return;
        const micro = resolveMicroApp() as
          | { start: (options?: Record<string, unknown>) => void }
          | undefined;
        micro?.start({ iframe: true, "disable-memory-router": true });
        hostRef.current.innerHTML = "";
        const embedUrl = buildEmbedUrl(config);
        const app = document.createElement("micro-app");
        app.setAttribute("name", elName);
        app.setAttribute("url", embedUrl);
        app.setAttribute("iframe", "true");
        app.setAttribute("disable-memory-router", "true");
        app.style.width = "100%";
        app.style.height = "100%";
        app.style.minHeight = "100%";
        app.style.display = "block";
        hostRef.current.appendChild(app);
        window.setTimeout(() => {
          if (cancelled || !hostRef.current) return;
          const frame = document.querySelector<HTMLIFrameElement>('iframe[powered-by="micro-app"]');
          if (!frame) return;
          frame.src = embedUrl;
          frame.style.display = "block";
          frame.style.width = "100%";
          frame.style.height = "100%";
          frame.style.border = "0";
          hostRef.current.appendChild(frame);
        }, 300);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [config]);

  if (!isConfigReady(config)) {
    return (
      <div className="sd-empty-wrap">
        <Empty description={t.emptyConfig} />
      </div>
    );
  }

  return (
    <div style={{ height: "100%", position: "relative" }}>
      {error ? <p className="sd-error">{t.loadFailed(error)}</p> : null}
      <div ref={hostRef} className="sd-demo-host sd-demo-frame" />
    </div>
  );
};

export default MicroAppDemo;
