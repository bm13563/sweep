import React from "react";
import { HorizontalStack } from "../../components/HorizontalStack";
import { HandleUiState } from "../../hooks/HandleUiState";
import { UndoRedo } from "./file/UndoRedo";
import { AdjustRgb } from "./processing/AdjustRgb";
import { FilterAbsoluteRgb } from "./processing/FilterAbsoluteRgb";
import { FilterPercentageRgb } from "./processing/FilterPercentageRgb";
import { ToolbarMenu } from "./ToolbarMenu";

export const ToolbarContainer = (): JSX.Element => {
    const isDisplayed = HandleUiState((state) => state.component);

    return (
        <div className={`h-full ${!!isDisplayed && "pointer-events-none"}`}>
            <HorizontalStack
                spacing={5}
                className="h-full children:flex children:h-full"
            >
                <ToolbarMenu name="File">
                    <UndoRedo />
                </ToolbarMenu>
                <ToolbarMenu name="Processing">
                    <AdjustRgb />
                    <FilterAbsoluteRgb />
                    <FilterPercentageRgb />
                </ToolbarMenu>
            </HorizontalStack>
        </div>
    );
};
