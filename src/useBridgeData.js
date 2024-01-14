import { useState, useEffect } from "react";
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
      const f = files.find((f) => f.includes(state));

      const response = await fetch(context(f));
      const txt = await response.text();
      const parsedData = Papa.parse(txt, { header: true }).data;
      setBridgeData(parsedData);
    };

    loadCSVData();
  }, [state]);
  return bridgeData;
}

export default useBridgeData;
