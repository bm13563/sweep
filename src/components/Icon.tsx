import React from "react";

export const Icon = ({
  className,
  title,
  size = 5,
  onClick,
}: {
  className: string;
  title: string;
  size?: number;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`flex align-middle inline-block cursor-pointer text-blues-text-primary hover:text-blues-text-accent ${className} 
      h-${String(size)} w-${String(size)}`}
      title={title}
    />
  );
};
