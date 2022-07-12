import React, { createContext } from "react";
import { Layout } from "./ui/Layout";
import { RenderLoop } from "./webgl/renderLoop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const renderLoop = new RenderLoop();
export const RenderLoopContext = createContext(renderLoop);

const App = (): JSX.Element => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Layout />
      </DndProvider>
    </div>
  );
};
export default App;
