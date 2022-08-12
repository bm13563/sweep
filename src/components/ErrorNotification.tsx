import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import React from "react";

export const ErrorNotification = ({ text }: { text: string }): JSX.Element => {
  return (
    <HorizontalStack className="space-between bg-blues-items-error rounded-sm p1">
      <Icon className="i-mdi-alert" title="Information" clickable={false} />
      <div className="subscript2 ml-1">{text}</div>
    </HorizontalStack>
  );
};
