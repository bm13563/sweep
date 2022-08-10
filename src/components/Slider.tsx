import { HorizontalStack } from "@/components/HorizontalStack";
import React, { useEffect, useRef, useState } from "react";

export interface SliderValueProps {
  red: string;
  green: string;
  blue: string;
}

export const Slider = ({
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onError,
  className,
}: {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: string) => void;
  onError?: (message: string | undefined) => void;
  className?: string;
}): JSX.Element => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [targetValue, setTargetValue] = useState(String(defaultValue));

  const isNumber = (value: string) => {
    return !!isNaN(Number(value));
  };

  const isOutOfRange = (value: string) => {
    return Number(value) < min || Number(value) > max;
  };

  const handleError = (message: string) => {
    if (sliderRef.current) sliderRef.current.value = `${targetValue}`;
    onError && onError(message);
  };

  const exceedsMaxLength = (value: string) => {
    return value.length > 4;
  };

  const updateValue = (value: string) => {
    onError && onError(undefined);
    if (value === "" || value.slice(-1) === ".") {
      return;
    }
    if (valueRef.current) valueRef.current.textContent = `${value}`;
    if (sliderRef.current) sliderRef.current.value = `${value}`;
    onChange && onChange(value);
    setTargetValue(value);
  };

  useEffect(() => {
    if (valueRef.current) valueRef.current.textContent = `${targetValue}`;
    if (sliderRef.current) sliderRef.current.value = `${targetValue}`;
  }, []);

  return (
    <div className={`subscript1 py-2 px-1 ${className}`}>
      <HorizontalStack
        spacing={2}
        className="justify-between first:whitespace-nowrap nth:2:grow"
      >
        <div>{`${min} - ${max}`}</div>
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          className="w-full hover:cursor-pointer"
          onChange={(e) => {
            updateValue(e.currentTarget.value);
          }}
        />
        <div
          ref={valueRef}
          onInput={(e) => {
            const value = e.currentTarget.textContent as string;

            if (isNumber(value)) {
              handleError("Input must be a number");
              return;
            }

            if (isOutOfRange(value)) {
              handleError("Input must be within range");
              return;
            }
            updateValue(value);
          }}
          onKeyDown={(e) => {
            const value = e.currentTarget.textContent as string;
            const selection = window.getSelection()?.toString().length ?? 0;

            if (
              exceedsMaxLength(value + ".") &&
              e.key != "Delete" &&
              e.key != "Backspace" &&
              e.key != "ArrowLeft" &&
              e.key != "ArrowRight" &&
              selection === 0
            ) {
              e.preventDefault();
            }

            if (e.key == "Enter") {
              valueRef.current?.blur();
              valueRef.current?.onselectionchange;
            }
          }}
          contentEditable
          className="h-full inline-block rounded-sm bg-white p-x-1 w-9 text-center hover:cursor-text"
        />
      </HorizontalStack>
    </div>
  );
};
