import React, { createContext } from "react";
import { PageContainer } from "./ui/UiContainer";
import { RenderLoop } from "./webgl/renderLoop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const renderLoop = new RenderLoop();
export const RenderLoopContext = createContext(renderLoop);

const App = (): JSX.Element => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <PageContainer />
            </DndProvider>
        </div>
    );
};
export default App;
