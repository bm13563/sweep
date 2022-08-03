import React, { createContext, useEffect, useState } from "react";
import { Layout } from "./ui/Layout";
import { RenderLoop } from "./webgl/renderLoop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Loading } from "./Loading";

const renderLoop = new RenderLoop();
export const RenderLoopContext = createContext(renderLoop);

const App = (): JSX.Element => {
  const [ready, setReady] = useState(false);
  return (
    <div>
      {ready ? (
        <DndProvider backend={HTML5Backend}>
          <Layout />
        </DndProvider>
      ) : (
        <Loading ready={() => setReady(true)} />
      )}
    </div>
  );
};
export default App;
