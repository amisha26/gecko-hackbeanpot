import React from 'react'
import * as d3 from 'd3'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import styled from 'styled-components'
import { ColorcetColorScale } from 'colorcet-js'

const HistogramAdjustor = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: transparent;
  fill: transparent;
`
const GreyHistogramAdjustor = styled(HistogramAdjustor)`
  filter: grayscale(1);
`

const HistogramWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 0;
  margin: 0;
`

export const Histogram = ({bands
}) => {
  const bands = React.useMemo(() => addZeroBands(bands, numBands), [bands, numBands])

  return bands.length == 0 ? null : (
    <HistogramWrapper>
      <ParentSize>
        {({ width, height }) =>
          width === 0 || height === 0 ? null : (
            <div
              style={{
                display: 'block',
                position: 'relative',
                bottom: '0',
                right: '0',
                width: width,
                height: height,
              }}>
              <HistogramAdjustor
                style={{
                  zIndex: 1,
                  width: Math.floor(
                    ((filteredValueRange.max.num - fullValueRange.min.num) /
                      (fullValueRange.max.num - fullValueRange.min.num)) *
                      width
                  ),
                  height: height,
                }}>
                <HistogramPoly
                  bands={bands}
                  numBands={numBands}
                  colorURL={colorURL}
                  width={width}
                  height={height}
                />
              </HistogramAdjustor>
              <GreyHistogramAdjustor
                style={{
                  zIndex: 2,
                  width: Math.floor(
                    ((filteredValueRange.min.num - fullValueRange.min.num) /
                      (fullValueRange.max.num - fullValueRange.min.num)) *
                      width
                  ),
                  height: height,
                  backgroundColor: GeckoTheme.colors.greyscale[800],
                }}>
                <HistogramPoly
                  bands={bands}
                  numBands={numBands}
                  colorURL={colorURL}
                  width={width}
                  height={height}
                />
              </GreyHistogramAdjustor>
              <GreyHistogramAdjustor
                style={{
                  zIndex: 0,
                  width: width,
                  height: height,
                }}>
                <HistogramPoly
                  bands={bands}
                  numBands={numBands}
                  colorURL={colorURL}
                  width={width}
                  height={height}
                />
              </GreyHistogramAdjustor>
            </div>
          )
        }
      </ParentSize>
    </HistogramWrapper>
  )
}

const addZeroBands = (bands, numBands) => {
  const newBands = []
  for (let i = 0; i < bands.length; i++) {
    const band = bands[i]
    if (i == 0) {
      if (band[0] != 0) newBands.push([0, 0])
      if (band[0] > 1) newBands.push([band[0] - 1, 0])
    } else {
      if (bands[i - 1][0] < band[0] - 1) newBands.push([band[0] - 1, 0])
    }
    newBands.push(band)
    if (i == bands.length - 1) {
      if (band[0] < numBands - 2) newBands.push([band[0] + 1, 0])
      if (band[0] < numBands - 1) newBands.push([numBands - 1, 0])
    } else {
      if (bands[i + 1][0] > band[0] + 1) newBands.push([band[0] + 1, 0])
    }
  }
  return newBands
}

const HistogramPoly = ({ bands, numBands, colorURL, width, height }) => {
  if (bands.length <= 0) return null
  // Declare the positional encodings.
  const x = d3
    .scaleLinear()
    .domain([0, numBands - 1])
    .nice()
    .range([0, width])

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(bands, (b) => b[1]) ?? 0])
    .nice()
    .range([height - 1, 1])

  const line = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]))
    .curve(d3.curveMonotoneX)

  const area = d3
    .area()
    .x((d) => x(d[0]))
    .y0((d) => y(d[1]))
    .y1(height)
    .curve(d3.curveMonotoneX)

  const d = line(bands)
  const a = area(bands)

  return a && d ? (
    <svg width={width} height={height}>
      <defs>
        <pattern
          id='myImage'
          patternUnits='userSpaceOnUse'
          width={width}
          height={height}>
          <image
            href={colorURL}
            x={0}
            y={0}
            preserveAspectRatio='none'
            height={height}
            width={width}
          />
        </pattern>
      </defs>
      <path
        d={a}
        fill={'url(#myImage)'}
        strokeWidth={2.5}
        opacity={0.25}
        strokeLinecap='round'
        stroke={'url(#myImage)'}
      />
      <path
        d={d}
        fill={`transparent`}
        strokeWidth={2}
        opacity={1}
        strokeLinecap='round'
        stroke={'url(#myImage)'}
      />
    </svg>
  ) : null
}
