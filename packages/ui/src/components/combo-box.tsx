"use client";

import * as React from "react";
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/utils";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  data: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  renderOption?: (option: ComboboxOption, selected: boolean) => React.ReactNode;
  emptyMessage?: string;
  onSearchChange?: (value: string) => void;
  searchLoading?: boolean;
  disableSearchFilter?: boolean;
  renderSelected?: (option: ComboboxOption | undefined) => React.ReactNode;
}

export const ComboBox = ({
  data,
  value,
  onChange,
  placeholder = "Select...",
  className,
  disabled = false,
  renderOption,
  emptyMessage = "No options found.",
  onSearchChange,
  searchLoading = false,
  disableSearchFilter = false,
  renderSelected,
}: ComboboxProps): React.JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string>("");
  const [searchValue, setSearchValue] = React.useState<string>("");
  const isControlled =
    typeof value !== "undefined" && typeof onChange === "function";
  const selectedValue = isControlled ? value : internalValue;

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number>();

  useEffect(() => {
    if (open && buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, [open]);

  const handleSelect = (currentValue: string) => {
    if (!isControlled) {
      setInternalValue(currentValue === selectedValue ? "" : currentValue);
    }
    if (onChange) {
      onChange(currentValue === selectedValue ? "" : currentValue);
    }
    setOpen(false);
  };

  const selectedOption = data.find((item) => item.value === selectedValue);
  const selectedLabel = selectedOption?.label;

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const filteredData = disableSearchFilter
    ? data
    : data.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
      );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full min-w-0 justify-between", className)}
          disabled={disabled}
        >
          {renderSelected
            ? renderSelected(selectedOption)
            : (selectedLabel ?? placeholder)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("min-w-0 p-0")}
        align="start"
        style={popoverWidth ? { width: popoverWidth } : undefined}
      >
        <div onWheel={(e) => e.stopPropagation()}>
          <Command shouldFilter={false}>
            <div className="flex h-9 items-center gap-2 border-b px-3">
              <svg
                className="size-4 shrink-0 opacity-50"
                fill="none"
                height="16"
                width="16"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                disabled={disabled}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <CommandList>
              <CommandEmpty className="px-2 pt-2 text-sm">
                {searchLoading ? "Searching..." : emptyMessage}
              </CommandEmpty>
              <CommandGroup>
                {filteredData.map((item) => {
                  const selected = selectedValue === item.value;
                  return (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                      onSelect={() => handleSelect(item.value)}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span>
                          {renderOption
                            ? renderOption(item, selected)
                            : item.label}
                        </span>
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
