import React, { createContext } from "react";
import { PageContainer } from "./components/position/PageContainer";
import { RenderLoop } from "./components/webgl/renderLoop";

const renderLoop = new RenderLoop();
export const RenderLoopContext = createContext(renderLoop);

const App = (): JSX.Element => {
    return (
        <div>
            <PageContainer />
        </div>
    );
};
export default App;
