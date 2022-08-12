import { useCentreAction } from "@/hooks/useCentreAction";

export const CentreAction = () => {
  const component = useCentreAction((state) => state.component);

  return <div className="w-full">{component}</div>;
};
