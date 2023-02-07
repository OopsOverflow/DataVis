import * as d3 from 'd3';
import React, {
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import '../styles/globals.css';
import * as svg from './svgpath.json';
import { type IGroupedData } from '@type/index';

interface Props {
  data: IGroupedData[];
}

const { CloudPath } = svg;

const getPie = (radius: number, angle: number = 0) => {
  return d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(angle ? angle : Math.PI / 3);
};

const addClipPath = (svg: any, angle: number, radius: number, color: string, key: number) => {
  // only whatever parts of the shape inside the clipPath are visible
  const group = svg.append('g').attr('clip-path', 'url(#myClipV2)');
  const arc = getPie(radius);

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
    }).
    on('mouseleave', () => {
      d3.select(`#arc${key}`).attr('fill', color);
    });

};

export function CloudPieChart({ data }: Props): ReactElement<SVGSVGElement> {
  useEffect(() => {
    const svg: any = d3
      .select('#cloud-svg')
      .attr('width', 500)
      .attr('viewBox', '0 0 1000 1000');

    const defs = svg.append('defs');
    // the clipPath, whatever shape you want to be the mask
    defs
      .append('clipPath')
      .attr('id', 'myClipV2')
      .append('path')
      .attr('d', CloudPath);

    addClipPath(svg, -90, 1000, 'red', 0);
    addClipPath(svg, -45, 1000, 'green', 1);

  }, []);

  return (
    <>
      <div id="cloud">
        <svg id="cloud-svg"></svg>
      </div>
    </>
  );
}
