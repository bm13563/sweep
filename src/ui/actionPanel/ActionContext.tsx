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
    dependencies = [],
}: {
    newConfig: ActionConfig | undefined;
    displayAction: boolean;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    dependencies?: any[];
}): void => {
    const { configState, setConfigState } = useContext(ActionState);

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const [dependencyState, setDependencyState] = useState<any[]>([]);

    const dependenciesHaveChanged = () => {
        return JSON.stringify(dependencies) !== JSON.stringify(dependencyState);
    };

    const configHasChanged = () => {
        return JSON.stringify(newConfig) !== JSON.stringify(configState);
    };

    useEffect(() => {
        if (
            displayAction &&
            (dependenciesHaveChanged() || configHasChanged())
        ) {
            dependencies && setDependencyState(dependencies);
            setConfigState && setConfigState(newConfig);
        }
    });

    useEffect(() => {
        if (!displayAction) {
            setConfigState && setConfigState(undefined);
        }
    }, [displayAction]);
};
