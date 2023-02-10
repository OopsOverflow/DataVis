import * as d3 from 'd3';
import React, { type ReactElement, useEffect } from 'react';
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
) => {
  // only whatever parts of the shape inside the clipPath are visible
  const group = svg.append('g').attr('clip-path', 'url(#myClipV2)');
  const arc = getPie(radius, anglePie);

  group
    .append('path')
    .attr('class', `arc`)
    .attr('id', `arc${key}`)
    .attr('d', arc)
    .attr('transform', `translate(${1000}, ${1000})rotate(${angle})`)
    .attr('fill', color)
    .on('mouseover', () => {
      console.log('', key);
      d3.select(`#arc${key}`).attr('fill', 'white');
    })
    .on('mouseleave', () => {
      d3.select(`#arc${key}`).attr('fill', color);
    });
};

export function CloudPieChart({ data }: Props): ReactElement<SVGSVGElement> {
  useEffect(() => {
    const svg: any = d3
      .select('#cloud-svg')
      .attr('width', 500)
      .attr('viewBox', `0 0 2800 2800`);

    const defs = svg.append('defs');
    // the clipPath, whatever shape you want to be the mask
    defs
      .append('clipPath')
      .attr('id', 'myClipV2')
      .append('path')
      .attr('width', '80%')
      .attr('d', CloudPath);

    addClipPath(svg, -90, Math.PI/3, 1000, 'gray', 0);
    addClipPath(svg, -30, Math.PI/3,1000, 'darkgray', 1);
    addClipPath(svg, 0, Math.PI/3,2000, 'gray', 2);
    addClipPath(svg, -145, Math.PI/3,1000, 'darkgray', 3);
    addClipPath(svg, 50, Math.PI/3,2000, 'darkgray', 4);
    addClipPath(svg, 110, Math.PI * 0.7, 2000, 'gray', 5);

    // addClipPath(svg, 5, 1000, 'green', 4);


  }, []);

  return (
    <>
      <div
        id="cloud"
        className="flex max-w-2xl mx-auto p-4"
      >
        <svg id="cloud-svg"></svg>
      </div>
    </>
  );
}
