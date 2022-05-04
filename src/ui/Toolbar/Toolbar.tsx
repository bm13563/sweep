import React from "react";
import { HorizontalStack } from "../../components/HorizontalStack";
import { useHandleUiState } from "../../hooks/useHandleUiState";
import { UndoRedo } from "./file/UndoRedo";
import { AdjustRgb } from "./processing/AdjustRgb";
import { FilterAbsoluteRgb } from "./processing/FilterAbsoluteRgb";
import { FilterPercentageRgb } from "./processing/FilterPercentageRgb";
import { MenuButton } from "./MenuButton";

export const Toolbar = (): JSX.Element => {
    const isDisplayed = useHandleUiState((state) => state.component);

    return (
        <div className={`h-full ${!!isDisplayed && "pointer-events-none"}`}>
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
                </MenuButton>
            </HorizontalStack>
        </div>
    );
};
