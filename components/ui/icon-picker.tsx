"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DynamicIcon } from "lucide-react/dynamic";

export const POPULAR_CATEGORY_ICONS = [
  "camera", "video", "music", "mic", "image", "scissors", "pen-tool", "gem", "gift", 
  "car", "truck", "plane", "home", "building", "star", "heart", "users", "map-pin", 
  "calendar", "cake", "flower2", "glass-water", "headphones", "party-popper", 
  "sparkles", "utensils", "shirt", "palette", "scissors-line-dashed", "tent",
  "monitor-play", "venetian-mask", "wine", "croissant"
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[200px]"
        >
          {value ? (
            <div className="flex items-center gap-2">
              <DynamicIcon name={value as any} className="w-4 h-4 text-[#2B4EFF]" />
              <span className="capitalize">{value}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Select an icon...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2" align="start">
        <ScrollArea className="h-[300px] w-full pr-4">
          <div className="grid grid-cols-4 gap-2 pt-1 pb-4">
            {POPULAR_CATEGORY_ICONS.map((iconName) => (
              <Button
                key={iconName}
                variant="outline"
                className={cn(
                  "h-14 w-full flex flex-col items-center justify-center gap-1 hover:bg-blue-50 hover:border-blue-200 transition-all",
                  value === iconName ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200 text-gray-500"
                )}
                onClick={() => {
                  onChange(iconName);
                  setOpen(false);
                }}
              >
                <DynamicIcon name={iconName as any} className="w-5 h-5 shrink-0" />
                <span className="text-[10px] w-full truncate text-center px-1 font-medium">{iconName}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
