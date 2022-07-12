import React from "react";

export const ErrorNotification = ({
  errorText,
  className,
}: {
  errorText: string;
  className?: string;
}): JSX.Element => {
  return (
    <div className={`bg-red-300 border text-center ${className}`}>
      <div className="subscript2">{errorText}</div>
    </div>
  );
};
