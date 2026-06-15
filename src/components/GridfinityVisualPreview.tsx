import React from "react";
import { getAu3dHoleCount, getColor, INCH_TO_MM } from "@/utils/gridfinityUtils";
import type { LayoutItem, DrawerSize, PrintProfile } from "@/types";

interface GridfinityVisualPreviewProps {
  layout: LayoutItem[];
  drawerSize: DrawerSize;
  useMm: boolean;
  printProfile?: PrintProfile;
}

const GridfinityVisualPreview: React.FC<GridfinityVisualPreviewProps> = ({ 
  layout, 
  drawerSize,
  printProfile = "default",
}) => {
  const formatMm = (value: number) => {
    const rounded = Math.round(value * 10) / 10;
    return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded}mm`;
  };

  const getItemLabel = (item: LayoutItem) => {
    const dimensions = `${formatMm(item.pixelWidth)} x ${formatMm(item.pixelHeight)}`;
    if (printProfile === "au3d" && item.type !== "spacer") {
      return `${getAu3dHoleCount(item.pixelWidth)} x ${getAu3dHoleCount(item.pixelHeight)}`;
    }
    return item.type === "spacer" ? `Trim ${dimensions}` : dimensions;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold">Visual Preview</h3>
      <div
        className="w-full relative border-2 border-black overflow-hidden"
        style={{
          paddingBottom: `${(drawerSize.height / drawerSize.width) * 100}%`,
        }}
      >
        <div className="absolute inset-0">
          {layout.map((item, index) => (
            <div
              key={index}
              className="absolute flex items-center justify-center border border-black px-1 text-center text-[10px] leading-tight md:text-xs overflow-hidden"
              style={{
                left: `${(item.pixelX / INCH_TO_MM / drawerSize.width) * 100}%`,
                top: `${(item.pixelY / INCH_TO_MM / drawerSize.height) * 100}%`,
                width: `${
                  (item.pixelWidth / INCH_TO_MM / drawerSize.width) * 100
                }%`,
                height: `${
                  (item.pixelHeight / INCH_TO_MM / drawerSize.height) * 100
                }%`,
                backgroundColor: getColor(item.type, index),
              }}
            >
              {getItemLabel(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridfinityVisualPreview;
