import React from "react";

// children MUST have a key
// TODO the above is complete programming by coincidence - using
// this component causes the child components to be re-mounted
// rather than the state being updated, which isn't desirable behaviour
// as we could be trying to update state within one of the chilren
// this really needs fixing
export const Overlay = ({
  display,
  children,
}: {
  display: number;
  children: JSX.Element[];
}) => {
  const childrenCopy: JSX.Element[] = [children[display]];
  children.forEach((child, index) => {
    index !== display && childrenCopy.push(child);
  });

  const reverseChildrenCopy = childrenCopy.reverse();

  return (
    <div className="h-full w-full relative overflow-hidden">
      {React.Children.map(reverseChildrenCopy, (child) => {
        return (
          <div className="absolute top-0 left-0 bg-white w-full h-999">
            {child}
          </div>
        );
      })}
    </div>
  );
};
