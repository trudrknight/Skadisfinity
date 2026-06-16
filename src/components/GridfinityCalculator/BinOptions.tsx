import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const BinOptions = ({
  preferUniformBaseplates,
  setPreferUniformBaseplates,
}) => {
  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold">Board Options</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="prefer-uniform-baseplates" className="flex-1">
            Prefer uniform Skadis board sizes
          </Label>
          <Switch
            id="prefer-uniform-baseplates"
            checked={preferUniformBaseplates}
            onCheckedChange={setPreferUniformBaseplates}
          />
        </div>
      </div>
    </div>
  );
};

export default BinOptions;
