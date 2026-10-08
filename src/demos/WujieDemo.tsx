import { Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import type { DemoConfig } from "@/config/demoConfig";
import { buildEmbedUrl, isConfigReady } from "@/config/demoConfig";
import { useI18n } from "@/i18n";
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
    degrade?: boolean;
  }) => void;
  destroyApp?: (name: string) => void;
}

declare global {
  interface Window {
    wujie?: WujieApi;
  }
}

const WUJIE_CDN = "/vendor/wujie.js";

const WujieDemo = ({ config }: Props) => {
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const appName = `luminary-${config.shareUid.slice(0, 8) || "demo"}`;

  useEffect(() => {
    if (!isConfigReady(config) || !hostRef.current) return;
    let cancelled = false;

    void (async () => {
      try {
        setError(null);
        await loadScript(WUJIE_CDN, "wujie");
        if (cancelled || !hostRef.current || !window.wujie) return;
        window.wujie.destroyApp?.(appName);
        hostRef.current.innerHTML = "";
        const embedUrl = buildEmbedUrl(config);
        window.wujie.startApp({
          name: appName,
          url: embedUrl,
          el: hostRef.current,
          alive: false,
          degrade: true,
        });
        window.setTimeout(() => {
          if (cancelled || !hostRef.current) return;
          const frame = hostRef.current.querySelector("iframe");
          if (frame) frame.src = embedUrl;
        }, 100);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      window.wujie?.destroyApp?.(appName);
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [config, appName]);

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

export default WujieDemo;
