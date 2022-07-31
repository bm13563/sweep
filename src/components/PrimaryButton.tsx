import React from "react";
import { Button, ButtonEvent } from "./Button";

export const PrimaryButton = ({
  text,
  onClick,
  active = true,
  className,
}: {
  text: string;
  onClick: (event: ButtonEvent) => void;
  active?: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <Button
      text={text}
      onClick={onClick}
      className={`bg-blues-items-primary hover:bg-blues-items-accent ${
        active || "disabled"
      } ${className}`}
    />
  );
};
