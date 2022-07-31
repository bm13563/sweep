import React from "react";

export const ErrorNotification = ({
  errorText,
  className,
}: {
  errorText: string;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={`bg-blues-items-error border border-blues-border-primary px-1 py-2 text-center ${className}`}
    >
      <div className="subscript2">{errorText}</div>
    </div>
  );
};
