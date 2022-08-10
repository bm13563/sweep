import React, { useEffect, useRef } from "react";

// FIXME
// Text boxes are currently broken:
// 1. Don't current support enter due to focussing issues

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
  }, [value]);

  return (
    <div className={`body1 ${className}`}>
      <div
        ref={divRef}
        className={`border-solid border-blues-text-primary border-1 rounded-sm py-2 px-1 overflow-y-auto ${className}`}
        style={{
          lineHeight: `${baseLineHeight}`,
          height: `${lines * baseLineHeight}em`,
          wordBreak: "break-word",
        }}
        contentEditable={editable}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            return;
          }
          onChange && onChange(e.currentTarget.textContent as string);
        }}
      />
    </div>
  );
};
