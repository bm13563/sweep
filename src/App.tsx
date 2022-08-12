import { Loading } from "@/Loading";
import { Layout } from "@/ui/Layout";
import { RenderLoop } from "@/webgl/renderLoop";
import { createContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const renderLoop = new RenderLoop();
export const RenderLoopContext = createContext(renderLoop);

const App = (): JSX.Element => {
  const [ready, setReady] = useState(true);
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
