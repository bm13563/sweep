import { HorizontalStack } from "@/components/HorizontalStack";
import React, { useState } from "react";

export const ExpandingMenuItem = ({
  name,
  children,
}: {
  name: string;
  children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [show, setShow] = useState(false);
  return (
    <div onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <HorizontalStack className={"w-[200%] h-full children:w-3/6 relative"}>
        <div
          className={`p-1 cursor-pointer bg-blues-items-primary hover:bg-blues-items-accent`}
        >
          <div className="subscript2">{name}</div>
        </div>
        <div className={`absolute top-0 w-3/6 ${show || "invisible"}`}>
          {children}
        </div>
      </HorizontalStack>
    </div>
  );
};
