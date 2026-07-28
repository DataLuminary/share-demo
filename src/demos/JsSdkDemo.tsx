import { Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import type { DemoConfig } from "@/config/demoConfig";
import { isConfigReady } from "@/config/demoConfig";
import { useI18n } from "@/i18n";
import { loadScript } from "./loadScript";

interface Props {
  config: DemoConfig;
}

interface LuminaryClient {
  embed: (options: {
    container: string | HTMLElement;
    token: string;
    dashboard: string;
    proxy?: string;
    appOrigin?: string;
    height?: string;
    width?: string;
  }) => { destroy: () => void } | null;
}

declare global {
  interface Window {
    Luminary?: LuminaryClient;
  }
}

const JsSdkDemo = ({ config }: Props) => {
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigReady(config) || !hostRef.current) return;
    let cancelled = false;
    let handle: { destroy: () => void } | null = null;

    void (async () => {
      try {
        setError(null);
        await loadScript(config.sdkUrl, "Luminary");
        if (cancelled || !hostRef.current || !window.Luminary) return;
        handle = window.Luminary.embed({
          container: hostRef.current,
          token: config.token,
          dashboard: config.shareUid,
          appOrigin: config.appOrigin,
          proxy: config.proxy.trim() || undefined,
          height: "100%",
        });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      handle?.destroy();
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

export default JsSdkDemo;
