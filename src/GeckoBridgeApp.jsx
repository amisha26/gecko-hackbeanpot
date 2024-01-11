import React from "react";
import useBridgeData from "./useBridgeData";

let GeckoBridgeApp = () => {
  let bridgeData = useBridgeData("MA");
  console.log(bridgeData);
  return (
    <div>
      <h1>Gecko Bridge Inventory Data</h1>
      {/* <your React components here> */}
    </div>
  );
};

export default GeckoBridgeApp;
