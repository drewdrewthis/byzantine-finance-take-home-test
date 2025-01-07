'use client';

import * as React from 'react';
import { Input } from "@/ui/components/input";
import { cn } from "@/lib/utils";
import { Search, Command } from "lucide-react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onInputChange?: (value: string) => void;
  className?: string;
}

export function SearchBar({ onInputChange, className, ...props }: SearchBarProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused) {
        e.preventDefault();
        setIsFocused(true);
        inputRef.current?.focus();
      } else if (e.key === "Escape" && isFocused) {
        setIsFocused(false);
        inputRef.current?.blur();
        if (inputRef.current) {
          inputRef.current.value = "";
          onInputChange?.("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, onInputChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange?.(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder="Filter vaults..."
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "pl-8 pr-10", // Left padding for search icon, right for command key
          "focus-visible:ring-1",
          "text-foreground"
        )}
        {...props}
      />
      <div className="absolute right-2 top-2 flex items-center p-1 bg-muted rounded-sm">
        <Command className="h-full w-3 text-muted-foreground" />
        <span className="ml-1 text-xs text-muted-foreground leading-[1] -mt-[1px]">{isFocused ? "esc" : "/"}</span>
      </div>
    </div>
  );
} 