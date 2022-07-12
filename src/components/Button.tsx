import React from "react";

export type ButtonEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: (event: ButtonEvent) => void;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={`h-full flex flex-col justify-center items-center rounded cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="body1">{text}</div>
    </div>
  );
};
