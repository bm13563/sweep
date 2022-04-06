import React, { ReactNode } from "react";

export const Header1 = ({
    children,
}: {
    children?: ReactNode;
}): JSX.Element => {
    return <div className="font-sans text-xl text-slate-900">{children}</div>;
};

export const Body1 = ({ children }: { children?: ReactNode }): JSX.Element => {
    return <div className="font-sans text-base text-slate-900">{children}</div>;
};

export const Subscript1 = ({
    children,
}: {
    children?: ReactNode;
}): JSX.Element => {
    return <div className="font-sans text-sm text-slate-900">{children}</div>;
};

export const Subscript2 = ({
    children,
}: {
    children?: ReactNode;
}): JSX.Element => {
    return <div className="font-sans text-xs text-slate-900">{children}</div>;
};
