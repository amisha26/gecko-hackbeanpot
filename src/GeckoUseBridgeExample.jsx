import React from "react";
import useBridgeData from "./useBridgeData";


let GeckoUseBridgeExample = () => {

    let [state, setState] = React.useState("MA");
    let bridgeData = useBridgeData(state);
    return (
        <div>
            <p>{state}</p>
            <p>{bridgeData.length}</p>


            {/* TODO: add more states */}
            <button onClick={() => setState("NY")}>Change State</button> 
        </div>
    );
};
export default GeckoUseBridgeExample;
