import React, { useRef, useState } from "react";
import { HandleClickOutside } from "../hooks/HandleClickOutside";
import { HorizontalStack } from "./HorizontalStack";
import { Body1 } from "./Typography";
import { VerticalStack } from "./VerticalStack";

export const Dropdown2 = ({
    options,
    onChange,
    defaultValue = "",
    className,
}: {
    options: string[];
    onChange: (value: string) => void;
    defaultValue?: string;
    className?: string;
}): JSX.Element => {
    const optionsRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState(defaultValue);
    const [displayOptions, setDisplayOptions] = useState(false);

    const clickOutsideCallback = () => {
        setDisplayOptions(false);
    };

    HandleClickOutside(optionsRef, clickOutsideCallback);

    return (
        <div className={`cursor-pointer ${className}`}>
            <Body1>
                <div className={`relative`}>
                    <div
                        onClick={() => {
                            setDisplayOptions(!displayOptions);
                        }}
                    >
                        <HorizontalStack className="border flex flew-row justify-between leading-none">
                            <>{value}</>
                            <div className="i-mdi-menu-down"></div>
                        </HorizontalStack>
                    </div>
                    {displayOptions && (
                        <div ref={optionsRef}>
                            <VerticalStack
                                className={`flex bg-white absolute w-full rounded`}
                            >
                                {options?.map((option) => {
                                    return (
                                        <div
                                            key={option}
                                            className="hover:bg-slate-200 hover:rounded"
                                            onClick={() => {
                                                setValue(option);
                                                setDisplayOptions(false);
                                                onChange(option);
                                            }}
                                        >
                                            {option}
                                        </div>
                                    );
                                })}
                            </VerticalStack>
                        </div>
                    )}
                </div>
            </Body1>
        </div>
    );
};