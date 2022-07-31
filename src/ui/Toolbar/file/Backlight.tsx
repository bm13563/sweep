import React, { useEffect, useState } from "react";
import { VerticalStack } from "../../../components/VerticalStack";
import { MenuItem } from "../MenuItem";

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
