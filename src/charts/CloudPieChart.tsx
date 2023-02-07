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

const arc : any = d3
  .arc()
  .innerRadius(0)
  .outerRadius(1000)
  .startAngle(0)
  .endAngle(Math.PI / 3);



export function CloudPieChart({ data }: Props): ReactElement<SVGSVGElement> {
  useEffect(() => {
    const svg : any = d3
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
  
    // only whatever parts of the shape inside the clipPath are visible
    const group = svg
      .append('g')
      .attr('clip-path', 'url(#myClipV2)')
    
    group.append('path')
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('transform', `translate(${1000}, ${1000})rotate(${-90})`)
      .attr("fill", "red");
    
      group.append('path')
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('transform', `translate(${1000}, ${1000})rotate(${-45})`)
      .attr("fill", "green");
  }, []);

  return (<>
  <div id="cloud">
    <svg id="cloud-svg"></svg>
  </div>
  </>);
}
