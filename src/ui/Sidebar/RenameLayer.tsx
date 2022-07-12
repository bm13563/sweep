import React from "react";
import { Icon } from "../../components/Icon";
import { UiLayer } from "../../primitives/uiLayer";

export const RenameLayer = ({
  toggleEditMode,
}: {
  toggleEditMode: () => void;
}): JSX.Element => {
  return (
    <Icon className="i-mdi-pencil" onClick={() => toggleEditMode()}></Icon>
  );
};
