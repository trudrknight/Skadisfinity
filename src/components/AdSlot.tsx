import React, { useEffect, useId } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  className?: string;
};

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT;
const ADSENSE_SLOT = import.meta.env.VITE_ADSENSE_SLOT;
const SHOW_PLACEHOLDER =
  import.meta.env.DEV || import.meta.env.VITE_ADSENSE_PLACEHOLDER === "true";

const AdSlot: React.FC<AdSlotProps> = ({ className = "" }) => {
  const adId = useId();
  const canRenderAd = Boolean(ADSENSE_CLIENT && ADSENSE_SLOT);

  useEffect(() => {
    if (!canRenderAd) return;

    const scriptId = "adsense-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      document.head.appendChild(script);
    }

    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [canRenderAd, adId]);

  if (!canRenderAd && !SHOW_PLACEHOLDER) {
    return null;
  }

  return (
    <section
      className={`mx-auto w-full max-w-4xl px-2 py-4 text-center ${className}`}
      aria-label="Advertisement"
    >
      <div className="mb-2 text-[11px] uppercase tracking-wide text-gray-400">
        Advertisement
      </div>
      {canRenderAd ? (
        <ins
          key={adId}
          className="adsbygoogle block min-h-[50px] w-full"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="mx-auto flex h-[64px] max-w-[728px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white/70 px-4 text-xs text-gray-400 shadow-sm sm:h-[90px]">
          Responsive sponsor slot
        </div>
      )}
    </section>
  );
};

export default AdSlot;
