import React from "react";
import { useToggleActionState } from "../../hooks/useToggleActionState";

export const Action = () => {
  const component = useToggleActionState((state) => state.component);

  return <div className="w-full">{component}</div>;
};
