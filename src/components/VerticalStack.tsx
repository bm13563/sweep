import { StackBase } from "@/components/StackBase";
import React from "react";

export const VerticalStack = ({
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
      className={`children:mt-${String(
        spacing
      )} nth:1:mt-0 flex flex-col justify-center ${className}`}
    >
      {children}
    </StackBase>
  );
};
