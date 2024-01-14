import React from "react";
import useBridgeData from "./useBridgeData";
import { LowHighSelector } from "./Selector";
import GeckoUseBridgeExample from "./GeckoUseBridgeExample";

let GeckoBridgeApp = () => {
  let bridgeData = useBridgeData("MA");
  console.log(bridgeData);
  const bins = [
    [0, 1],
    [2, 6],
    [3, 20],
    [4, 101],
    [5, 64],
    [7, 4],
    [8, 8],
    [11, 1],
    [12, 1],
    [13, 1],
    [15, 1],
  ];
  const startValue = 10;
  const binWidth = 2;
  return (
    <div>
      {/* <your React components here> */}
      <h1>Bridge Inventory Data</h1>

      {/* An example of how to use the histogram component: */}
      <div height={100} width={200}>
        <LowHighSelector
          bins={bins}
          startValue={startValue}
          binWidth={binWidth}
        />
      </div>

      {/* For an example of how to update the state, see: */}
      <GeckoUseBridgeExample />
    </div>
  );
};

export default GeckoBridgeApp;
