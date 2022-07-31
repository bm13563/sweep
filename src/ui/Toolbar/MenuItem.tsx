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
      className={`p-1 ${
        !active
          ? "pointer-events-none bg-blues-items-disabled"
          : "cursor-pointer bg-blues-items-primary hover:bg-blues-items-accent"
      }`}
      onClick={onClick}
    >
      <div className="subscript2">{name}</div>
    </div>
  );
};
