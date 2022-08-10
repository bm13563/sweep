import React from "react";
import { StackBase } from "@/components/StackBase";

export const HorizontalStack = ({
  spacing = 0,
  className = "",
  children,
}: {
  spacing?: number;
  className?: string;
  children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
  return (
    <StackBase
      className={`children:ml-${String(
        spacing
      )} nth:1:ml-0 flex flex-row items-center ${className}`}
    >
      {children}
    </StackBase>
  );
};
