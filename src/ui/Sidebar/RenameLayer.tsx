import React, { useState } from "react";
import { Icon } from "../../components/Icon";

export const RenameLayer = ({
  toggleEditMode,
}: {
  toggleEditMode: () => void;
}): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  const update = () => {
    toggleEditMode();
    setEditMode(!editMode);
  };

  return (
    <Icon
      title={`${editMode ? "Finish editing" : "Edit name"}`}
      className={`i-mdi-pencil ${editMode && "bg-blues-text-accent"}`}
      onClick={update}
    />
  );
};
