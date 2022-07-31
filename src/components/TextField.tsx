import React, { useEffect, useRef } from "react";

export const TextField = ({
  value,
  lines = 1,
  editable = true,
  onChange,
  className,
}: {
  value: string;
  lines?: number;
  editable?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}): JSX.Element => {
  const baseLineHeight = 1; // match leading-tight tailwind class
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && value !== undefined) {
      divRef.current.textContent = value;
    }
  });

  return (
    <div className={`body1 ${className}`}>
      <div
        ref={divRef}
        onInput={(e) => {
          onChange && onChange(e.currentTarget.textContent as string);
        }}
        className={`border-solid border-blues-text-primary border-1 rounded-sm py-2 px-1 overflow-y-auto whitespace-pre-wrap break-words ${className}`}
        style={{
          lineHeight: `${baseLineHeight}`,
          height: `${lines * baseLineHeight}em`,
        }}
        contentEditable={editable}
      />
    </div>
  );
};
