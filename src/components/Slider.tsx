import React, { useEffect, useRef, useState } from "react";
import { HorizontalStack } from "./HorizontalStack";
import { Subscript2 } from "./Typography";

export const Slider2 = ({
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    className,
}: {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: string) => void;
    className?: string;
}): JSX.Element => {
    const sliderRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(String(defaultValue));

    const updateValue = (value: string) => {
        onChange && onChange(value);
        setValue(value);
    };

    useEffect(() => {
        if (sliderRef.current) sliderRef.current.value = `${defaultValue}`;
    }, []);

    return (
        <div className={`py-2 px-1 ${className}`}>
            <Subscript2>
                <HorizontalStack
                    spacing={2}
                    className="justify-between first:whitespace-nowrap nth:2:grow"
                >
                    <div>{`${min} - ${max}`}</div>
                    <input
                        ref={sliderRef}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        className="w-full"
                        onChange={(e) => {
                            updateValue(e.currentTarget.value);
                        }}
                    />
                    <div>{value}</div>
                </HorizontalStack>
            </Subscript2>
        </div>
    );
};
