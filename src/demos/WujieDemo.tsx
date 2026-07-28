import { Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";
import { loadScript } from "./loadScript";

interface Props {
  config: DemoConfig;
}

interface WujieApi {
  startApp: (options: {
    name: string;
    url: string;
    el: HTMLElement | null;
    alive?: boolean;
  }) => void;
  destroyApp?: (name: string) => void;
}

declare global {
  interface Window {
    Wujie?: WujieApi;
  }
}

const WUJIE_CDN = "https://cdn.jsdelivr.net/npm/wujie@1/lib/index.umd.js";

const WujieDemo = ({ config }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const appName = `luminary-${config.shareUid.slice(0, 8) || "demo"}`;

  useEffect(() => {
    if (!isConfigReady(config) || !hostRef.current) return;
    let cancelled = false;

    void (async () => {
      try {
        setError(null);
        await loadScript(WUJIE_CDN, "Wujie");
        if (cancelled || !hostRef.current || !window.Wujie) return;
        window.Wujie.destroyApp?.(appName);
        hostRef.current.innerHTML = "";
        window.Wujie.startApp({
          name: appName,
          url: buildEmbedUrl(config),
          el: hostRef.current,
          alive: true,
        });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      window.Wujie?.destroyApp?.(appName);
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [config, appName]);

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

export default WujieDemo;
