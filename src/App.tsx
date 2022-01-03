import React, { createContext } from "react";
import { PageContainer } from "./ui/PageContainer";
import { RenderLoop } from "./webgl/renderLoop";

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
