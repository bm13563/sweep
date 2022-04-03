import React, { RefObject, useEffect } from "react";

export const HandleClickOutside = (
    ref: RefObject<HTMLDivElement>,
    clickOutside: () => void,
    exception?: () => boolean
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (exception && exception()) return;

            if (ref.current && !ref.current.contains(event.target as Node)) {
                clickOutside();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, clickOutside, exception]);
};
