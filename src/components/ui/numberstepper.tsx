"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function NumberStepper({
  className = "",
  onChange,
}: {
  className?: string;
  onChange?: (value: number) => void;
}) {
  const [value, setValue] = useState(1);

  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(0, value - 1);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`inline-flex items-center border border-gray-300  overflow-hidden ${className}`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={decrement}
        className="h-8 w-8 p-0 rounded-none border-r hover:bg-gray-100"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <div className="px-3 py-1 text-sm font-medium min-w-[40px] text-center bg-white">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min="0"
          className="w-[30px] text-center bg-transparent border-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={increment}
        className="h-8 w-8 p-0 rounded-none border-l hover:bg-gray-100"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
