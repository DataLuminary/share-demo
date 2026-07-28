import { Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";
import { loadScript } from "./loadScript";

interface Props {
  config: DemoConfig;
}

declare global {
  interface Window {
    microApp?: { start: () => void };
  }
}

const MICRO_APP_CDN =
  "https://cdn.jsdelivr.net/npm/@micro-zoe/micro-app/lib/index.umd.js";

const MicroAppDemo = ({ config }: Props) => {
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
        window.microApp?.start();
        hostRef.current.innerHTML = "";
        const app = document.createElement("micro-app");
        app.setAttribute("name", elName);
        app.setAttribute("url", buildEmbedUrl(config));
        app.setAttribute("iframe", "");
        app.style.width = "100%";
        app.style.minHeight = "640px";
        app.style.display = "block";
        hostRef.current.appendChild(app);
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
    return <Empty description="请先配置 shareUid 与 token" />;
  }

  return (
    <div>
      {error ? <p className="sd-muted">加载失败：{error}</p> : null}
      <div ref={hostRef} className="sd-demo-host sd-demo-frame" />
    </div>
  );
};

export default MicroAppDemo;
