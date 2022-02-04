import React, { createContext, useContext, useEffect, useState } from "react";
import { ActionConfig } from "./Action";

export const ActionState = createContext<{
    configState: ActionConfig | undefined;
    setConfigState?: (config: ActionConfig | undefined) => void;
}>({
    configState: undefined,
});

export const ActionStateProvider = ({
    children,
}: {
    children: JSX.Element;
}): JSX.Element => {
    const [config, setConfig] = useState<ActionConfig | undefined>(undefined);

    return (
        <ActionState.Provider
            value={{ configState: config, setConfigState: setConfig }}
        >
            {children}
        </ActionState.Provider>
    );
};

export const useAction = ({
    newConfig,
    displayAction,
}: {
    newConfig: ActionConfig | undefined;
    displayAction: boolean;
}): void => {
    const { configState, setConfigState } = useContext(ActionState);

    useEffect(() => {
        //FIXME: better equality check
        if (
            displayAction &&
            JSON.stringify(newConfig) !== JSON.stringify(configState)
        ) {
            setConfigState && setConfigState(newConfig);
        }
    });

    useEffect(() => {
        if (!displayAction) {
            setConfigState && setConfigState(undefined);
        }
    }, [displayAction]);
};
