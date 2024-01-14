import React from "react";
import * as d3 from "d3";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import styled from "styled-components";
import { ColorcetColorScale } from "./colorcet/colorcet-js.ts";

const HistogramAdjustor = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: transparent;
  fill: transparent;
`;
const GreyHistogramAdjustor = styled(HistogramAdjustor)`
  filter: grayscale(1);
`;

const HistogramWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 0;
  margin: 0;
`;

/**
 * @param nonZeroBins - an array, where each element is an array of length 2 following the format [bin #, count]
 * @param startValue - the start value, so bin 0 goes from [ startValue, startValue + binWidth)
 * @param binWidth - width of each bin
 * @param filteredStart - the histogram up to this value will appear greyscale
 * @param filteredEnd - the histogram after this value will appear greyscale
 */

export const Histogram = ({
  nonZeroBins,
  startValue,
  binWidth,
  filteredStart,
  filteredEnd,
}) => {
  const { bins, endValue, colorScale, numBins } = React.useMemo(() => {
    const numBins = nonZeroBins.at(-1)[0];
    if (nonZeroBins.length === 0)
      return {
        bins: nonZeroBins,
        endValue: startValue,
        colorScale: new ColorcetColorScale().getTextureURL(),
        numBins: 0,
      };
    const bins = addZeroBins(nonZeroBins, numBins);
    const endValue = (numBins + 1) * binWidth + startValue;
    const colorScale = new ColorcetColorScale({
      name: "R4",
    }).getTextureURL();
    return { bins, endValue, colorScale, numBins };
  }, [nonZeroBins, startValue, binWidth]);
  return bins.length === 0 ? null : (
    <HistogramWrapper>
      <ParentSize>
        {({ width, height }) =>
          width === 0 || height === 0 ? null : (
            <div
              style={{
                display: "block",
                position: "relative",
                bottom: "0",
                right: "0",
                width: width,
                height: height,
              }}
            >
              <HistogramAdjustor
                style={{
                  zIndex: 1,
                  width: Math.floor(
                    ((filteredEnd - startValue) / (endValue - startValue)) *
                      width
                  ),
                  height: height,
                }}
              >
                <HistogramPoly
                  bins={bins}
                  numbins={numBins}
                  colorURL={colorScale}
                  width={width}
                  height={height}
                />
              </HistogramAdjustor>
              <GreyHistogramAdjustor
                style={{
                  zIndex: 2,
                  width: Math.floor(
                    ((filteredStart - startValue) / (endValue - startValue)) *
                      width
                  ),
                  height: height,
                }}
              >
                <HistogramPoly
                  bins={bins}
                  numbins={numBins}
                  colorURL={colorScale}
                  width={width}
                  height={height}
                />
              </GreyHistogramAdjustor>
              <GreyHistogramAdjustor
                style={{
                  zIndex: 0,
                  width: width,
                  height: height,
                }}
              >
                <HistogramPoly
                  bins={bins}
                  numbins={numBins}
                  colorURL={colorScale}
                  width={width}
                  height={height}
                />
              </GreyHistogramAdjustor>
            </div>
          )
        }
      </ParentSize>
    </HistogramWrapper>
  );
};

const addZeroBins = (bins, numBins) => {
  const newbins = [];
  for (let i = 0; i < bins.length; i++) {
    const bin = bins[i];
    if (i === 0) {
      if (bin[0] !== 0) newbins.push([0, 0]);
      if (bin[0] > 1) newbins.push([bin[0] - 1, 0]);
    } else {
      if (bins[i - 1][0] < bin[0] - 1) newbins.push([bin[0] - 1, 0]);
    }
    newbins.push(bin);
    if (i === bins.length - 1) {
      if (bin[0] < numBins - 2) newbins.push([bin[0] + 1, 0]);
      if (bin[0] < numBins - 1) newbins.push([numBins - 1, 0]);
    } else {
      if (bins[i + 1][0] > bin[0] + 1) newbins.push([bin[0] + 1, 0]);
    }
  }
  return newbins;
};

const HistogramPoly = ({ bins, numbins, colorURL, width, height }) => {
  if (bins.length <= 0) return null;

  // Declare the positional encodings.
  const x_scale = d3
    .scaleLinear() // linearly transforms value --> visual point
    .domain([0, numbins - 1]) // inputs cover the number of bins; inclusive
    .nice() // sets the domain range to some nicely rounded number
    .range([0, width]); // range covers the width we've allowed for the SVG

  const y_scale = d3
    .scaleLinear() // linearly transforms value --> visual point
    .domain([0, d3.max(bins, (b) => b[1]) ?? 0]) // inputs cover the range of bin values; inclusive
    .nice() // sets the domain range to some nicely rounded number
    .range([height - 1, 1]);

  // Declares shape encodings
  const line = d3
    .line() // defines a line shape
    .x((d) => x_scale(d[0])) // sets x accessor
    .y((d) => y_scale(d[1])) // sets y accessor
    .curve(d3.curveMonotoneX); // defines the line to be a curve

  const area = d3
    .area() // defines an area shape
    .x((d) => x_scale(d[0])) // sets x accessor
    .y0((d) => y_scale(d[1])) // sets baseline y accessor
    .y1(height) // sets top line
    .curve(d3.curveMonotoneX); // defines the line to be a curve

  const d = line(bins); // creates line element from bins
  const a = area(bins); // creates area element from bins

  return a && d ? (
    <svg width={width} height={height}>
      <defs>
        <pattern
          id="myImage"
          patternUnits="userSpaceOnUse"
          width={width}
          height={height}
        >
          <image
            href={colorURL}
            x={0}
            y={0}
            preserveAspectRatio="none"
            height={height}
            width={width}
          />
        </pattern>
      </defs>
      <path
        d={a}
        fill={"url(#myImage)"}
        strokeWidth={2.5}
        opacity={0.25}
        strokeLinecap="round"
        stroke={"url(#myImage)"}
      />
      <path
        d={d}
        fill={`transparent`}
        strokeWidth={2}
        opacity={1}
        strokeLinecap="round"
        stroke={"url(#myImage)"}
      />
    </svg>
  ) : null;
};
