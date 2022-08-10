import "@/styles/Loading.css";
import React, { useEffect, useState } from "react";

export const Loading = ({ ready }: { ready: () => void }) => {
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    setTimeout(() => ready(), 2500);
  }, []);

  useEffect(() => {
    setTimeout(() => setOverlay(true), 1400);
  }, []);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex relative items-center justify-center">
        <img className="z-5" src="/td_logo_transparent.png"></img>
        {!overlay && <div className="absolute z-4 a1"></div>}
        {!overlay && <div className="absolute z-4 a2"></div>}
        {!overlay && <div className="absolute z-4 a3"></div>}
        {!overlay && <div className="absolute z-4 a4"></div>}
        {!overlay && <div className="absolute z-4 a5"></div>}
        {overlay && <div className="absolute z-4 a6"></div>}
        {overlay && <div className="absolute z-4 a7"></div>}
      </div>
    </div>
  );
};
