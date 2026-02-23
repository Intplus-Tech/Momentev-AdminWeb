"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
}

export function TagInput({ tags, setTags, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Treat comma or enter as a command to "add tag"
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleBlur = () => {
    addTag();
  };

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full"
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="flex items-center gap-1 font-normal bg-blue-50 text-blue-700 hover:bg-blue-100/80 px-2 py-1 text-xs rounded-md transition-colors"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-400 hover:text-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
