import React from "react";
import { styled } from "styled-components";
import * as Slider from "@radix-ui/react-slider";
import { Histogram } from "./Histogram";

const SliderRoot = styled(Slider.Root)`
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  user-select: none;
  touch-action: none;
  height: 20px;
`;

const SliderTrack = styled(Slider.Track)`
  position: relative;
  background-color: gainsboro;
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  border-radius: 5px;
  overflow: clip;
  height: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const SliderThumb = styled(Slider.Thumb)`
  display: block;
  width: 16px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 20px;
  height: 16px;
  border-radius: 10px;
`;

export const LowHighSelector = ({ bins, startValue, binWidth }) => {
  const endValue = React.useMemo(() => {
    const numBins = bins.at(-1)[0];
    const endValue = (numBins + 1) * binWidth + startValue;
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

      <SliderRoot
        width={100}
        min={startValue}
        max={endValue}
        value={value}
        onValueChange={setValue}
      >
        <SliderTrack>
          <Slider.Range />
        </SliderTrack>
        <SliderThumb />
        <SliderThumb />
      </SliderRoot>
    </div>
  );
};
