import React from "react";

export const Icon = ({
  className,
  size = 5,
  onClick,
}: {
  className: string;
  size?: number;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`flex align-middle inline-block cursor-pointer ${className} 
      h-${String(size)} w-${String(size)}`}
    />
  );
};
