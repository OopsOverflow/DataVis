import * as d3 from 'd3';
import React, { type ReactElement, useEffect, useState } from 'react';
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
  const group = svg
    .append('g')
    .attr('clip-path', 'url(#myClipV2)')
    // .attr('filter', 'url(#filter-map)');
  const arc = getPie(radius, anglePie);

  group
    .append('path')
    .attr('class', `arc`)
    .attr('id', `arc${key}`)
    .attr('d', arc)
    .attr('transform', `translate(${1200}, ${1000})rotate(${angle})`)
    .attr('fill', `${color}${0.4})`)
    .on('mouseover', (event: any) => {
      console.log('', key);
      d3.select(`#arc${key}`).attr('fill', `${color} ${0})`);
      // eslint-disable-next-line n/no-callback-literal
      callback({
        x: event.x,
        y: event.y,
      });
    })
    .on('mouseleave', () => {
      d3.select(`#arc${key}`).attr('fill', `${color} ${0.4})`);
      callback(null);
    });
};

interface Tooltip {
  x: number;
  y: number;
  label: string;
}

export function CloudPieChart({ data }: Props): ReactElement<SVGSVGElement> {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    const svg: any = d3
      .select('#cloud-svg')
      .attr('width', 500)
      .attr('filter', 'url(#filter-map)')
      .attr('viewBox', `0 0 2800 1800`);

    const defs = d3.select('#defs');
    // the clipPath, whatever shape you want to be the mask
    defs
      .append('clipPath')
      .attr('id', 'myClipV2')
      .append('path')
      .attr('width', '80%')
      // .attr('filter', 'url(#filter-map)')
      .attr('d', CloudPath);

    svg
      .append('image')
      .attr('xlink:href', './pollution.png')
      .attr('width', '100%')
      // .attr('filter', 'url(#filter-map)')
      .attr('clip-path', 'url(#myClipV2)');

    // .attr('style', 'background-image: url(./pollution.png)')

    const total = data.reduce((i, d) => (i += d.values[0]), 0);
    const temp = [...data];
    temp.reduce((angle, d, i) => {
      // console.log(angle);
      const { label, values } = d;
      const radius = (values[0] / total) * Math.PI * 2;
      const rotate = (values[0] / total) * 360;
      addClipPath(
        svg,
        angle,
        radius,
        2000,
        `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, `,
        i,
        (obj: any) => {
          setTooltip({ ...obj, label });
        },
      );
      return (angle = angle + rotate);
    }, -90);
  }, []);

  return (
    <>
      <div id="cloud" className="mx-auto flex max-w-2xl p-4">
        <svg id="cloud-svg">
          <defs id="defs">
            <filter
              id="filter-map"
              x="-0.15000001"
              y="-0.15000001"
              width="1.3"
              height="1.3"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                stdDeviation="4"
                in="SourceGraphic"
                result="result1"
                id="feGaussianBlur4202"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05"
                numOctaves="4"
                result="result0"
                id="feTurbulence4204"
              />
              <feDisplacementMap
                in2="result0"
                scale="20"
                xChannelSelector="R"
                yChannelSelector="G"
                in="result1"
                result="result2"
                id="feDisplacementMap4206"
              />
              <feGaussianBlur
                stdDeviation="3"
                in="SourceGraphic"
                result="result4"
                id="feGaussianBlur4208"
              />
              <feComposite
                in2="result2"
                operator="arithmetic"
                k1="1.5"
                k2="-0.25"
                k3="0.5"
                k4="0"
                in="result4"
                result="result5"
                id="feComposite4210"
              />
            </filter>
          </defs>
          {/* <div id="cloud-background"></div> */}
        </svg>
      </div>
      {tooltip !== null ? (
        <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          <span className="tooltip__title">{tooltip.label}</span>
          <table className="tooltip__table">
            <thead>
              <tr>
                <td>CO2</td>
                <td>Ammonia</td>
                <td>Methane</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.map((d, key) => (
                  <td key={key}>{d.values[key]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
