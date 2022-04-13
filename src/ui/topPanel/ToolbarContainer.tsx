import React from "react";
import { HorizontalStack } from "../../components/HorizontalStack";
import { HandleUi } from "../../hooks/HandleUi";
import { UiLayer } from "../uiLayer";
import { UndoRedo } from "./file/UndoRedo";
import { AdjustRgb } from "./processing/AdjustRgb";
import { FilterAbsoluteRgb } from "./processing/FilterAbsoluteRgb";
import { ToolbarMenu } from "./ToolbarMenu";

export const ToolbarContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const isDisplayed = HandleUi((state) => state.component);

    return (
        <div className={`h-full ${!!isDisplayed && "pointer-events-none"}`}>
            <HorizontalStack
                spacing={5}
                className="h-full children:flex children:h-full"
            >
                <ToolbarMenu name="File">
                    <UndoRedo
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </ToolbarMenu>
                <ToolbarMenu name="Processing">
                    <AdjustRgb
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                    <FilterAbsoluteRgb
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </ToolbarMenu>
            </HorizontalStack>
        </div>
    );
};
