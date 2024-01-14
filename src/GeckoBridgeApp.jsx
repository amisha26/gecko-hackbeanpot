import React from "react";
import useBridgeData from "./useBridgeData";
import { LowHighSelector } from "./Selector";

let GeckoBridgeApp = () => {
  // let bridgeData = useBridgeData("MA");
  // console.log(bridgeData);
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
      <h1>Gecko Bridge Inventory Data</h1>
      <LowHighSelector
        bins={bins}
        startValue={startValue}
        binWidth={binWidth}
      />

      {/* <your React components here> */}
    </div>
  );
};

export default GeckoBridgeApp;
