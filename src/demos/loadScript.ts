export function loadScript(src: string, globalKey?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (globalKey && (window as unknown as Record<string, unknown>)[globalKey]) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[data-sd-src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.sdSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}
