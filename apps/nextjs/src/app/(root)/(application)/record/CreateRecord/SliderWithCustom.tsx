import React, { useState, useEffect } from "react";
import { Input } from "@gym/ui/components/input";

interface SliderWithCustomProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  units?: string;
}

export const SliderWithCustom: React.FC<SliderWithCustomProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  units = "kg",
}) => {
  const [customValue, setCustomValue] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (!isCustom) {
      setCustomValue("");
    }
  }, [value, isCustom]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustom(false);
    onChange(Number(e.target.value));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);
    const num = Number(val);
    if (!isNaN(num) && val !== "") {
      setIsCustom(true);
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={isCustom ? Math.min(Math.max(value, min), max) : value}
            onChange={handleSliderChange}
            className="accent-primary w-full"
          />
          <span className="w-16 text-center">
            {value} {units}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">Custom:</span>
        <Input
          type="number"
          step={step}
          value={customValue}
          onChange={handleCustomChange}
          className="w-1/3"
          onKeyDown={(e) => {
            if (
              [
                "Backspace",
                "Delete",
                "Tab",
                "Escape",
                "Enter",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End",
                "Period",
                "NumpadDecimal",
                "Minus",
                "NumpadSubtract",
              ].includes(e.key)
            ) {
              return;
            }
            // Prevent: anything that's not a number
            if (!/^[0-9]$/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {units && (
          <span className="text-muted-foreground text-xs">{units}</span>
        )}
      </div>
    </div>
  );
};

export default SliderWithCustom;
