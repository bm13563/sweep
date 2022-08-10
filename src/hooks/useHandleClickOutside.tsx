import { RefObject, useEffect } from "react";

export const useHandleClickOutside = (
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

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, clickOutside, exception]);
};
