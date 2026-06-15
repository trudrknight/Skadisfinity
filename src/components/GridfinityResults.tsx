import React from "react";
import type { CalculationResultWithDrawers } from "@/hooks/useGridfinityCalculation";
import { getAu3dHoleCount, getProfileGridSize } from "@/utils/gridfinityUtils";
import type { PrintProfile } from "@/types";

interface GridfinityResultsProps {
  result: CalculationResultWithDrawers;
  useMm: boolean;
  useHalfSize?: boolean;
  preferHalfSize?: boolean;
  printProfile?: PrintProfile;
}

const GridfinityResults: React.FC<GridfinityResultsProps> = ({ 
  result, 
  useHalfSize, 
  preferHalfSize,
  printProfile = "default",
}) => {
  const { baseplates, halfSizeBins, spacers, numDrawers } = result;

  const multiplyQuantities = (obj: Record<string, number>): Record<string, number> => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, value * numDrawers])
    );
  };

  const totalBaseplates = multiplyQuantities(baseplates);
  const totalHalfSizeBins = halfSizeBins
    ? multiplyQuantities(halfSizeBins)
    : null;
  const totalSpacers = multiplyQuantities(spacers);

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold">
        Results for {numDrawers} layout{numDrawers > 1 ? "s" : ""}
      </h4>
      {!useHalfSize && Object.keys(totalBaseplates).length > 0 && (
        <div>
          <h5 className="text-lg font-medium">Skadis Boards:</h5>
          <ul className="list-disc list-inside pl-4">
            {Object.entries(totalBaseplates).map(([size, count]) => {
              const [width, height] = size.split("x").map(Number);
              const gridSize = getProfileGridSize(printProfile, false);
              const widthMm = width * gridSize;
              const heightMm = height * gridSize;
              const profileLabel = printProfile === "au3d"
                ? `${getAu3dHoleCount(widthMm)} x ${getAu3dHoleCount(heightMm)} `
                : "";

              return (
                <li key={size} className="text-gray-700">
                  {count} {profileLabel}Skadis board(s) ({widthMm}mm x {heightMm}mm)
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {(useHalfSize || preferHalfSize) && totalHalfSizeBins && Object.keys(totalHalfSizeBins).length > 0 && (
        <div>
          <h5 className="text-lg font-medium">Half-size Skadis Pieces:</h5>
          <ul className="list-disc list-inside pl-4">
            {Object.entries(totalHalfSizeBins).map(([size, count]) => (
              <li key={size} className="text-gray-700">
                {count} {size} half-size piece(s)
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(totalSpacers).length > 0 && (
        <div>
          <h5 className="text-lg font-medium">Spacers:</h5>
          <ul className="list-disc list-inside pl-4">
            {Object.entries(totalSpacers).map(([size, count]) => (
              <li key={size} className="text-gray-700">
                {count} trim piece(s): {size}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GridfinityResults;
