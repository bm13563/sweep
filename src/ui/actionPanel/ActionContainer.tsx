import React, { useContext } from "react";
import { Action } from "./Action";
import { ActionState } from "./ActionContext";

export const ActionContainer = (): JSX.Element => {
    const { configState } = useContext(ActionState);

    return (
        <div className="absolute w-1/6 z-2">
            <div className="z-3">
                {configState && <Action config={configState} />}
            </div>
        </div>
    );
};
