import React, { useState, useRef } from "react";
import { PrimaryButton } from "../../components/PrimaryButton";
import { VerticalStack } from "../../components/VerticalStack";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";

export const MenuButton = ({
  name,
  children,
}: {
  name: string;
  children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const closeOnClick = () => {
    setOpen(false);
  };

  useHandleClickOutside(menuRef, closeOnClick);

  return (
    <div className="mr-2 z-2 text-center">
      <div className="" ref={menuRef}>
        <PrimaryButton
          text={name}
          onClick={() => setOpen(!open)}
          className="w-25 h-full subscript1 bg-items-primary hover:bg-items-accent"
        />
      </div>
      <VerticalStack className={`${!open && "invisible"}`}>
        {children}
      </VerticalStack>
    </div>
  );
};
