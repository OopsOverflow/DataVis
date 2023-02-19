import * as d3 from 'd3';
import React, { type ReactElement, useEffect, useState } from 'react';
import colors from './colors.json';
import '@styles/globals.css';
import * as svg from './svgpath.json';
import { type IGroupedData } from '@type/index';

interface Props {
  data: IGroupedData[];
}

const { CloudPath } = svg;

const getPie = (
  radius: number,
  angle: number = 0,
): d3.Arc<unknown, d3.DefaultArcObject> => {
  return d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(angle || Math.PI / 3);
};

const addClipPath = (
  svg: any,
  angle: number,
  anglePie: number = 0,
  radius: number,
  color: string,
  key: number,
  callback: (e: { x: number; y: number } | null) => void,
) => {
  // only whatever parts of the shape inside the clipPath are visible
  const group = svg.append('g').attr('clip-path', 'url(#myClipV2)');
  // .attr('filter', 'url(#filter-map)');
  const arc = getPie(radius, anglePie);

  group
    .append('path')
    .attr('class', `arc`)
    .attr('id', `arc${key}`)
    .attr('d', arc)
    .attr('transform', `translate(${1200}, ${1000})rotate(${angle})`)
    .attr('fill', `${color}${1})`)
    .on('mouseover', (event: any) => {
      console.log('key', key);
      d3.select(`#arc${key}`).attr('fill', `rgba(${colors.dark}, ${0.9})`);
      // eslint-disable-next-line n/no-callback-literal
      callback({
        x: event.x,
        y: event.y,
      });
    })
    .on('mouseleave', () => {
      d3.select(`#arc${key}`).attr('fill', `${color} ${1})`);
      callback(null);
    });
};

interface Tooltip {
  x: number;
  y: number;
  label: string;
  values: number[];
}

export function CloudPieChart({ data }: Props): ReactElement<SVGSVGElement> {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    const svg: any = d3
      .select('#cloud-svg')
      .attr('width', 500)
      .attr('viewBox', `0 0 2800 1800`);

    svg.html("<defs id='defs'></defs>");

    const defs = d3.select('#defs');

    // svg.selectAll("*").remove();

    // the clipPath, whatever shape you want to be the mask
    defs
      .append('clipPath')
      .attr('id', 'myClipV2')
      .append('path')
      .attr('width', '80%')
      .attr('d', CloudPath);

    svg
      .append('image')
      .attr('xlink:href', './pollution.png')
      .attr('width', '100%')
      .attr('clip-path', 'url(#myClipV2)');

    const total = data.reduce((i, d) => (i += d.values[0]), 0);
    const temp = [...data];
    // console.log(temp)
    temp.reduce((angle, d, i) => {
      console.log('angle', angle, d, total);
      const { label, values } = d;
      const color: number[] =
        colors[Object.keys(colors)[(i % 4) + 2] as keyof typeof colors];
      const radius = (values[0] / total) * Math.PI * 2;
      const rotate = (values[0] / total) * 360;
      addClipPath(
        svg,
        angle,
        radius,
        2000,
        `rgba(${color[0]}, ${color[1]}, ${color[2]},`,
        i,
        (obj: any) => {
          setTooltip({ ...obj, label, values });
        },
      );
      return (angle = angle + rotate);
    }, -90);

    svg
      .append('svg')
      .attr('id', 'sub-cloud')
      .attr('width', 2000)
      .attr('viewBox', '-500 700 2800 500').html(`<defs id="defs">
      <clipPath id="myClipV2">
        <path
          width="100%"
          d="M2129.067,830.128c42.644-59.107,67.786-131.679,67.786-210.131c0-259.61-266.858-432.555-502.906-329.817 c-75.747-54.693-169.528-76.742-261.851-61.949c-21.234-116.703-123.389-205.189-246.219-205.189 c-122.181,0-223.895,87.557-245.866,203.344c-229.544-191.489-581.348-2.784-541.762,298.727 C200.735,506.486,31.918,661.707,31.918,858.132c0,171.537,129.116,312.894,295.46,332.247 c-53.444,345.443,370.186,547.453,606.966,299.698c138.459,114.259,346.778,91.73,456.524-55.185 c87.232,114.345,224.895,188.151,379.818,188.151C2183.791,1623.043,2397.584,1134.949,2129.067,830.128z"
        ></path>
      </clipPath>
    </defs>
    <image
      href="./pollution.png"
      width="90%"
      clip-path="url(#myClipV2)"
    ></image>`);
    // .append(defs);
  }, [data]);

  return (
    <>
      <div
        id="cloud"
        className="mx-auto flex max-w-2xl flex-col items-center justify-center p-4 text-center"
      >
        <svg id="cloud-svg">
          <defs id="defs"></defs>
        </svg>
        <p className="max-w-md text-sm">
          A “cloud” doughnut chart going into more detail about the CO2
          emissions of each animal’s production.
        </p>
      </div>
      {tooltip !== null ? (
        <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          <span className="tooltip__title">{tooltip.label}</span>
          <table className="tooltip__table">
            <thead>
              <tr>
                <td>Total Emission per Kg</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td key={Math.random()}>{tooltip.values[0]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
