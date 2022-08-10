import { VerticalStack } from "@/components/VerticalStack";
import "@/styles/Backlight.css";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import React, { useEffect, useState } from "react";

export const Backlight = () => {
  const [backlight, setBacklight] = useState("ambient");
  useEffect(() => {
    document.body.className = backlight;
  }, [backlight]);
  return (
    <VerticalStack>
      <MenuItem
        onClick={() => setBacklight("none")}
        name={"None"}
        active={true}
      />
      <MenuItem
        onClick={() => setBacklight("ambient")}
        name={"Ambient"}
        active={true}
      />
    </VerticalStack>
  );
};
