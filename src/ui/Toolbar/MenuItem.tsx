import React from "react";

export const MenuItem = ({
  onClick,
  name,
  active,
}: {
  onClick: () => void;
  name: string;
  active: boolean;
}): JSX.Element => {
  return (
    <div
      className={`h-full w-full p-1 ${
        !active
          ? "pointer-events-none bg-items-disabled"
          : "bg-items-primary hover:bg-items-accent cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="subscript2">{name}</div>
    </div>
  );
};
