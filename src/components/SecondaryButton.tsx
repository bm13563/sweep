import React from "react";
import { Button } from "./Button";

export const SecondaryButton = ({
  text,
  onClick,
  active = true,
  className,
}: {
  text: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <Button
      text={text}
      onClick={onClick}
      className={`${
        active ? "bg-blues-items-secondary hover:bg-blues-items-accent" : "disabled"
      } ${className}`}
    />
  );
};
