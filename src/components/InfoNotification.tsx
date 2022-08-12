import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import React from "react";

export const InfoBox = ({ text }: { text: string }) => {
  return (
    <HorizontalStack className="space-between bg-blues-items-primary rounded-sm p1">
      <Icon
        className="i-mdi-information"
        title="Information"
        clickable={false}
      />
      <div className="subscript2 ml-1">{text}</div>
    </HorizontalStack>
  );
};
