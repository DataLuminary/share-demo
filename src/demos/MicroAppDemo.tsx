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
  start: (options?: Record<string, unknown>) => void;
}

function resolveMicroApp(): MicroAppApi | null {
  const raw = (window as unknown as { microApp?: MicroAppApi & { default?: MicroAppApi } }).microApp;
  if (!raw) return null;
  return raw.default?.start ? raw.default : raw.start ? raw : null;
}

const MicroAppDemo = ({ config }: Props) => {
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigReady(config) || !hostRef.current) return;
    const host = hostRef.current;
    let cancelled = false;
    const name = `luminary-${config.shareUid.replace(/-/g, "").slice(0, 8)}`;

    void (async () => {
      try {
        await loadScript("/vendor/micro-app.js", "microApp");
        if (cancelled) return;
        const micro = resolveMicroApp();
        if (!micro) throw new Error("microApp.start is not a function");
        micro.start({ iframe: true, "router-mode": "pure" });
        host.innerHTML = "";
        const app = document.createElement("micro-app");
        app.setAttribute("name", name);
        app.setAttribute("url", buildEmbedUrl(config));
        app.setAttribute("iframe", "true");
        app.setAttribute("router-mode", "pure");
        app.style.display = "block";
        app.style.width = "100%";
        app.style.height = "100%";
        app.style.minHeight = "0";
        host.appendChild(app);
        const embedUrl = buildEmbedUrl(config);
        const pin = () => {
          if (cancelled) return;
          const frames = [...document.querySelectorAll<HTMLIFrameElement>('iframe[powered-by="micro-app"]')].filter(
            (frame) => frame.id === name,
          );
          const frame = frames[0];
          if (!frame) return;
          if (!frame.src.includes("/embed/share/")) frame.src = embedUrl;
          frame.style.position = "absolute";
          frame.style.inset = "0";
          frame.style.display = "block";
          frame.style.width = "100%";
          frame.style.height = "100%";
          frame.style.border = "0";
          if (frame.parentElement !== host) host.appendChild(frame);
          for (const extra of frames.slice(1)) extra.remove();
        };
        window.setTimeout(pin, 300);
        window.setTimeout(pin, 900);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
      host.innerHTML = "";
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
    <div className="sd-demo-frame sd-sdk-host">
      {error ? <Empty description={error} /> : null}
      <div ref={hostRef} className="sd-sdk-mount" />
    </div>
  );
};

export default MicroAppDemo;
