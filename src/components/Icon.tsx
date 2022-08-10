import React from "react";

export const Icon = ({
  className,
  title,
  size = 5,
  clickable = true,
  onClick,
}: {
  className: string;
  title: string;
  size?: number;
  clickable?: boolean;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`flex align-middle inline-block text-blues-text-primary ${
        clickable && "cursor-pointer hover:text-blues-text-accent"
      } ${className} 
      h-${String(size)} w-${String(size)}`}
      title={title}
    />
  );
};
