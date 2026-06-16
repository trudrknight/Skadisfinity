const CLOUDFLARE_ANALYTICS_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

export const loadCloudflareAnalytics = () => {
  const token = import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN;

  if (!token || typeof document === "undefined") {
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${CLOUDFLARE_ANALYTICS_SRC}"]`
  );

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.defer = true;
  script.src = CLOUDFLARE_ANALYTICS_SRC;
  script.setAttribute("data-cf-beacon", JSON.stringify({ token }));

  document.head.appendChild(script);
};
