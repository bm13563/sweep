import { useAction } from "@/hooks/useAction";

export const CentreAction = () => {
  const centreAction = useAction((state) => state.centreAction);

  return <div className="w-full">{centreAction}</div>;
};
