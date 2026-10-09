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
  startApp: (options: Record<string, unknown>) => void;
  destroyApp?: (name: string) => void;
}

const WujieDemo = ({ config }: Props) => {
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigReady(config) || !hostRef.current) return;
    const host = hostRef.current;
    let cancelled = false;
    const name = `luminary-${config.shareUid.replace(/-/g, "").slice(0, 8)}`;
    const url = buildEmbedUrl(config);

    void (async () => {
      try {
        await loadScript("/vendor/wujie.js", "wujie");
        if (cancelled) return;
        const wujie = (window as unknown as { wujie?: WujieApi }).wujie;
        if (!wujie?.startApp) throw new Error("wujie.startApp is not a function");
        host.innerHTML = "";
        wujie.startApp({
          name,
          url,
          el: host,
          alive: false,
          degrade: true,
        });
        const pin = () => {
          if (cancelled) return;
          const frame = document.querySelector<HTMLIFrameElement>(`iframe[name="${name}"]`);
          if (!frame) return;
          frame.removeAttribute("srcdoc");
          if (!frame.src.includes("/embed/share/")) frame.src = url;
          frame.style.display = "block";
          frame.style.width = "100%";
          frame.style.height = "640px";
          frame.style.border = "0";
          if (frame.parentElement !== host) host.appendChild(frame);
          host.querySelector("[data-loading-flag]")?.remove();
        };
        window.setTimeout(pin, 80);
        window.setTimeout(pin, 400);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
      const wujie = (window as unknown as { wujie?: WujieApi }).wujie;
      wujie?.destroyApp?.(name);
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

export default WujieDemo;
