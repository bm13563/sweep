import { HorizontalStack } from "@/components/HorizontalStack";
import { ExpandingMenuItem } from "@/ui/Toolbar/ExpandingMenuItem";
import { Backlight } from "@/ui/Toolbar/file/Backlight";
import { UndoRedo } from "@/ui/Toolbar/file/UndoRedo";
import { MenuButton } from "@/ui/Toolbar/MenuButton";
import { AdjustRgb } from "@/ui/Toolbar/processing/AdjustRgb";
import { FilterAbsoluteRgb } from "@/ui/Toolbar/processing/FilterAbsoluteRgb";
import { FilterPercentageRgb } from "@/ui/Toolbar/processing/FilterPercentageRgb";
import { ThreeXKernal } from "@/ui/Toolbar/processing/ThreeXKernal";

export const Toolbar = (): JSX.Element => {
  return (
    <div className="h-5">
      <HorizontalStack
        spacing={0}
        className="h-full children:flex children:h-full"
      >
        <MenuButton name="File">
          <UndoRedo />
          {/* <ExpandingMenuItem name="Backlight">
            <Backlight />
          </ExpandingMenuItem> */}
        </MenuButton>
        <MenuButton name="Processing">
          <AdjustRgb />
          {/* <FilterAbsoluteRgb />
          <FilterPercentageRgb />
          <ThreeXKernal /> */}
        </MenuButton>
        {/* <MenuButton name="Tools">
          <BandCalculator />
        </MenuButton> */}
      </HorizontalStack>
    </div>
  );
};
