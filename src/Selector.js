import React from "react";
import { styled } from "styled-components";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Histogram } from "./Histogram";

const StyledSlider = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  "&[data-orientation=horizontal]": { height: 16 },
  "&[data-orientation=vertical]": {
    flexDirection: "column",
    width: 16,
    height: "100%",
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: "gainsboro",
  position: "relative",
  flexGrow: 1,
  "&[data-orientation=horizontal]": { height: 2 },
  "&[data-orientation=vertical]": { width: 2 },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "dodgerblue",
  borderRadius: "9999px",
  "&[data-orientation=horizontal]": { height: "100%" },
  "&[data-orientation=vertical]": { width: "100%" },
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  display: "block",
  width: 16,
  height: 16,
  backgroundColor: "white",
  border: "1px solid lightgray",
  borderRadius: "20px",
  ":focus": {
    outline: "none",
    borderColor: "dodgerblue",
  },
});

export const LowHighSelector = ({ bins, startValue, binWidth }) => {
  const endValue = React.useMemo(() => {
    const numBins = bins.at(-1)[0];
    const endValue = numBins * binWidth + startValue;
    return endValue;
  }, [bins, binWidth, startValue]);
  const [value, setValue] = React.useState([startValue, endValue]);

  return bins.length === 0 ? null : (
    <div>
      <Histogram
        nonZeroBins={bins}
        startValue={startValue}
        binWidth={binWidth}
        filteredStart={value[0]}
        filteredEnd={value[1]}
      />
      <StyledSlider
        min={startValue}
        max={endValue}
        value={value}
        onValueChange={setValue}
      >
        <StyledTrack>
          <StyledRange />
        </StyledTrack>
        <StyledThumb key={value[0]} />
        <StyledThumb key={value[1]} />
      </StyledSlider>
    </div>
  );
};
