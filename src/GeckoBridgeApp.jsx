import React from "react";
import useBridgeData from "./useBridgeData";
import GeckoUseBridgeExample from "./GeckoUseBridgeExample";

let GeckoBridgeApp = () => {
  let bridgeData = useBridgeData("MA");
  console.log(bridgeData)
  return (
    <div>
      <h1>Gecko Bridge Inventory Data</h1>
      {/* <your React components here> */}

      {/* For an example of how to update the state, use: */}
      {/* <GeckoUseBridgeExample /> */}
    </div>
  );
};

export default GeckoBridgeApp;
