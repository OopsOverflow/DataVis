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
  callback: Function,
) => {
  // only whatever parts of the shape inside the clipPath are visible
  const group = svg.append('g').attr('clip-path', 'url(#myClipV2)');
  const arc = getPie(radius, anglePie);

  group
    .append('path')
    .attr('class', `arc`)
    .attr('id', `arc${key}`)
    .attr('d', arc)
    .attr('transform', `translate(${1200}, ${1000})rotate(${angle})`)
    .attr('fill', `${color}${0.7})`)
    .on('mouseover', (event : any) => {
      console.log('', key);
      d3.select(`#arc${key}`).attr('fill', `${color} ${0})`);
      callback({
        x: event.x,
        y: event.y,
      })
    })
    .on('mouseleave', () => {
      d3.select(`#arc${key}`).attr('fill', `${color} ${0.7})`);
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
      .attr('viewBox', `0 0 2800 1800`);

    const defs = svg.append('defs');
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
        `rgba(${Math.random() * 30}, 0, 0, `,
        i,
        (obj: any) => {
          setTooltip({...obj, label});
        },
      );
      return (angle = angle + rotate);
    }, -90);
  }, []);

  return (
    <>
    <a>        Hover on cloud to view pollution details.</a>
      <div id="cloud" className="mx-auto flex max-w-2xl p-4">
        <svg id="cloud-svg">
          <div id="cloud-background"></div>
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
                {data.map((d) => (
                  <td>{d.values[0]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
