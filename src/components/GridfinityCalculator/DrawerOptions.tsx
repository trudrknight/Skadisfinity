import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PrintProfile } from "@/types";

const printProfiles: Array<{ value: PrintProfile; label: string }> = [
  { value: "default", label: "Default" },
  { value: "au3d", label: "AU3D" },
];

const DrawerOptions = ({ numDrawers, setNumDrawers, printProfile, setPrintProfile }) => {
  const [localValue, setLocalValue] = React.useState(String(numDrawers || 1));
  const [profileOpen, setProfileOpen] = React.useState(false);
  const selectedProfile = printProfiles.find((profile) => profile.value === printProfile) || printProfiles[0];
  
  React.useEffect(() => {
    setLocalValue(String(numDrawers || 1));
  }, [numDrawers]);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow user to type freely
    setLocalValue(value);
    
    // Update actual value if valid
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setNumDrawers(parsedValue);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Layout Options</h3>
      <div className="flex items-center space-x-4">
        <Label htmlFor="numDrawers" className="flex-1">
          Number of Duplicate Layouts
        </Label>
        <Input
          id="numDrawers"
          type="text"
          inputMode="numeric"
          value={localValue}
          onChange={handleInputChange}
          onBlur={() => {
            // Reset to 1 if invalid
            const parsed = parseInt(localValue, 10);
            if (isNaN(parsed) || parsed < 1) {
              setNumDrawers(1);
              setLocalValue("1");
            }
          }}
          className="w-24"
          placeholder="1"
        />
      </div>
      <div className="space-y-2">
        <h4 className="text-base font-semibold">Print profile</h4>
        <div className="flex items-center space-x-4">
          <Label htmlFor="printProfile" className="flex-1">
            Profile
          </Label>
          <Popover open={profileOpen} onOpenChange={setProfileOpen}>
            <PopoverTrigger asChild>
              <Button
                id="printProfile"
                variant="outline"
                role="combobox"
                aria-label="Print Profile"
                aria-expanded={profileOpen}
                className="w-36 justify-between"
              >
                {selectedProfile.label}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {printProfiles.map((profile) => (
                      <CommandItem
                        key={profile.value}
                        value={profile.value}
                        onSelect={() => {
                          setPrintProfile(profile.value);
                          setProfileOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedProfile.value === profile.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {profile.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DrawerOptions;
