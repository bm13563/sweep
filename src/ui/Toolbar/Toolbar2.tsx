import { HorizontalStack } from "@/components/HorizontalStack";
import { useUndoRedo } from "@/ui/Toolbar/file/useUndoRedo";
import { MenuButton } from "@/ui/Toolbar/MenuButton";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import { useAdjustRgb } from "@/ui/Toolbar/processing/useAdjustRgb";

export interface MenuItemConfig {
  name: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const Toolbar2 = () => {
  const undoRedo = useUndoRedo();
  const adjustRgb = useAdjustRgb();

  const file = {
    category: "File",
    items: [...undoRedo],
  };

  const processing = {
    category: "Processing",
    items: [...adjustRgb],
  };

  const menuItems = [file, processing];

  console.log(menuItems);

  return (
    <div className="h-5">
      <HorizontalStack
        spacing={0}
        className="h-full children:flex children:h-full"
      >
        {menuItems.map(({ category, items }) => (
          <MenuButton key={category} name={category}>
            {items.map(({ name, onClick, active }) => (
              <MenuItem
                key={name}
                name={name}
                onClick={onClick}
                active={active}
              />
            ))}
          </MenuButton>
        ))}
      </HorizontalStack>
    </div>
  );
};
