import { useAction } from "@/hooks/useAction";
import { AdjustRgbAction } from "@/ui/Action/AdjustRgbAction";
import { MenuItem } from "@/ui/Toolbar/MenuItem";

export const AdjustRgb = (): JSX.Element => {
  const setSideAction = useAction((state) => state.setSideAction);

  const setDisplayUi = () => {
    console.log("fire");
    setSideAction(AdjustRgbAction)
  }

  return (
    <MenuItem
      active={true}
      onClick={setDisplayUi}
      name={"Adjust RGB"}
    />
  );
};
