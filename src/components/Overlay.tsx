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
  className,
}: {
  display: number;
  children: JSX.Element[];
  className: string;
}) => {
  const childrenCopy: JSX.Element[] = [children[display]];
  children.forEach((child, index) => {
    index !== display && childrenCopy.push(child);
  });

  return (
    <div className="flex w-full h-full">
      {React.Children.map(childrenCopy, (child, index) => {
        return index === 0 ? (
          <div className={`w-full h-full ${className}`}>{child}</div>
        ) : (
          <div className="w-0 h-0 hidden">{child}</div>
        );
      })}
    </div>
  );
};
