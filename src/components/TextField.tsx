import React, { useEffect, useRef } from "react";
import { Body1 } from "./Typography";

export const TextField2 = ({
    defaultValue = "",
    lines = 1,
    editable = true,
    onChange,
    className,
}: {
    defaultValue?: string;
    lines?: number;
    editable?: boolean;
    onChange?: (value: string) => void;
    className?: string;
}): JSX.Element => {
    const baseLineHeight = 1; // match leading-tight tailwind class
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) divRef.current.textContent = defaultValue;
    }, []);

    return (
        <div className={`${className}`}>
            <Body1>
                <div
                    ref={divRef}
                    onInput={(e) =>
                        onChange &&
                        onChange(e.currentTarget.textContent as string)
                    }
                    className={`border overflow-y-auto break-words`}
                    style={{
                        lineHeight: `${baseLineHeight}`,
                        height: `${lines * baseLineHeight}em`,
                    }}
                    contentEditable={editable}
                />
            </Body1>
        </div>
    );
};
