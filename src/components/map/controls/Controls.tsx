import React from "react";

export interface ChildProps {
    children?: React.ReactNode;
}

export const Controls = ({ children }: ChildProps): JSX.Element => {
    return <>{children}</>;
};
