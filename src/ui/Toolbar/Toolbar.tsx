import React from "react";
import { HorizontalStack } from "../../components/HorizontalStack";
import { UndoRedo } from "./file/UndoRedo";
import { AdjustRgb } from "./processing/AdjustRgb";
import { FilterAbsoluteRgb } from "./processing/FilterAbsoluteRgb";
import { FilterPercentageRgb } from "./processing/FilterPercentageRgb";
import { MenuButton } from "./MenuButton";
import { ThreeXKernal } from "./processing/ThreeXKernal";
import { BandCalculator } from "./tools/BandCalculator";
import { ExpandingMenuItem } from "./ExpandingMenuItem";
import { Backlight } from "./file/Backlight";

export const Toolbar = (): JSX.Element => {
  return (
    <div className="h-5">
      <HorizontalStack
        spacing={0}
        className="h-full children:flex children:h-full"
      >
        <MenuButton name="File">
          <UndoRedo />
          <ExpandingMenuItem name="Backlight">
            <Backlight />
          </ExpandingMenuItem>
        </MenuButton>
        <MenuButton name="Processing">
          <AdjustRgb />
          <FilterAbsoluteRgb />
          <FilterPercentageRgb />
          <ThreeXKernal />
        </MenuButton>
        <MenuButton name="Tools">
          <BandCalculator />
        </MenuButton>
      </HorizontalStack>
    </div>
  );
};
