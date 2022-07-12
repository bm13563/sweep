import React from "react";
import { HorizontalStack } from "../../components/HorizontalStack";
import { UndoRedo } from "./file/UndoRedo";
import { AdjustRgb } from "./processing/AdjustRgb";
import { FilterAbsoluteRgb } from "./processing/FilterAbsoluteRgb";
import { FilterPercentageRgb } from "./processing/FilterPercentageRgb";
import { MenuButton } from "./MenuButton";
import { ThreeXKernal } from "./processing/ThreeXKernal";

export const Toolbar = (): JSX.Element => {
  return (
    <div className={`h-full`}>
      <HorizontalStack
        spacing={5}
        className="h-full children:flex children:h-full"
      >
        <MenuButton name="File">
          <UndoRedo />
        </MenuButton>
        <MenuButton name="Processing">
          <AdjustRgb />
          <FilterAbsoluteRgb />
          <FilterPercentageRgb />
          <ThreeXKernal />
        </MenuButton>
      </HorizontalStack>
    </div>
  );
};
