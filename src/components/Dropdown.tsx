import React, { useRef, useState } from "react";
import { useHandleClickOutside } from "../hooks/useHandleClickOutside";
import { HorizontalStack } from "./HorizontalStack";
import { VerticalStack } from "./VerticalStack";

export const Dropdown = ({
  options,
  onChange,
  value = "",
  displayNumber = 10,
  className,
}: {
  options: string[];
  onChange: (value: string) => void;
  value: string;
  displayNumber?: number;
  className?: string;
}): JSX.Element => {
  const optionsRef = useRef<HTMLDivElement>(null);

  const [displayOptions, setDisplayOptions] = useState(false);

  const clickOutsideCallback = () => {
    setDisplayOptions(false);
  };

  useHandleClickOutside(optionsRef, clickOutsideCallback);

  return (
    <div className={`body1 cursor-pointer ${className}`}>
      <div className={`relative`} ref={optionsRef}>
        <div
          onClick={() => {
            setDisplayOptions(!displayOptions);
          }}
        >
          <HorizontalStack className="rounded-sm border-solid border-blues-text-primary border-1 py-2 px-1 flex flew-row justify-between leading-none z-1">
            <>{value}</>
            <div className="i-mdi-menu-down"></div>
          </HorizontalStack>
        </div>
        {displayOptions && (
          <div>
            <VerticalStack
              className={`flex bg-blues-blues-background-secondary absolute w-full rounded-sm z-2`}
            >
              {options?.map((option) => {
                return (
                  <div
                    key={option}
                    className="hover:bg-blues-blues-background-accent hover:rounded-sm"
                    onClick={() => {
                      setDisplayOptions(false);
                      onChange(option);
                    }}
                  >
                    {option}
                  </div>
                );
              })}
            </VerticalStack>
          </div>
        )}
      </div>
    </div>
  );
};
