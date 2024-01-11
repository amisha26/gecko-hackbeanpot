import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function useBridgeData(state) {
  const [bridgeData, setBridgeData] = useState({});
  useEffect(() => {
    const loadCSVData = async () => {
      if (state === undefined) {
        setBridgeData({});
        return {};
      }
      const context = require.context("./data", false, /\.txt$/);
      const files = context.keys();
      let data = [];
      const f = files.find((f) => f.includes(state));

      const response = await fetch(context(f));
      const txt = await response.text();
      const parsedData = Papa.parse(txt, { header: true }).data;
      const fileName = f.replace("./", "").replace(".txt", "");
      data = parsedData.map((d) => {
        let tempData = {};
        console.log(d);
        // d.keys().forEach((element) => {
        //   print(element);
        // });
      });

      setBridgeData(data);
    };

    loadCSVData();
  }, [state]);
  return bridgeData;
}

export default useBridgeData;
