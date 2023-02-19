import * as d3 from 'd3';
import React, {
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from './colors.json';
import '@styles/globals.css';
import { type IGroupedData } from '@type/index';

// Cattle | Produced,Goat | Produced,Chicken | Produced,Turkey | Produced,Pig | Produced,Lamb and mutton | Produced,Meat, Total | tonnes,Game | tonnes,Duck | tonnes,Horse | tonnes,Camel | tonnes,Goose and guinea fowl | tonnes,Sheep and goat | tonnes,Beef and buffalo | tonnes,Pig | tonnes,Poultry | tonnes

interface Props {
  data: IGroupedData[];
}

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  onMouseEnter: (e: MouseEvent<SVGPathElement>) => void;
  onMouseLeave: () => void;
}

interface Tooltip {
  x: number;
  y: number;
  info: any;
}
function Bar({
  x,
  y,
  width,
  height,
  color,
  onMouseEnter,
  onMouseLeave,
}: BarProps): ReactElement<SVGPathElement> {
  const radius = 0;

  return (
    <path
      d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - 2 * radius}
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius}
      h-${width}
      z
    `}
      fill={color}
      onMouseEnter={(event) => {
        onMouseEnter(event);
      }}
      onMouseLeave={onMouseLeave}
    />
  );
}

const parseData = (data: IGroupedData[]) => {
  return data.map(({ label, values }) => {
    return {
      label,
      values: values.filter(
        (v: any) =>
          v.label !== 'Meat, Total | tonnes' &&
          v.label !== 'Horse | tonnes' &&
          v.label !== 'Camel | tonnes',
      ),
    };
  });
};

export function StackedBarChart({ data }: Props): ReactElement<SVGSVGElement> {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [curData, setCur] = useState(data);
  const [mouseBar, setMouseBar] = useState<number>(-1);
  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  // console.log(data)

  const margin = { top: 10, right: 0, bottom: 10, left: 30 };
  const width = window.innerWidth * 0.5 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const labels = curData.map(({ label }) => label);

  const sublabels = curData[0]
    ? curData[0].values.map(({ label }: any) => label)
    : [];
  const subvalues = curData.map(({ values }) =>
    values.filter(
      (v: any) =>
        v.label !== 'Meat, Total | tonnes' && v.label !== 'Horse | tonnes',
    ),
  );

  const colorLabels = sublabels.reduce(
    (res, l, i) => ({
      ...res,
      [l]: colors[Object.keys(colors)[i % 6] as keyof typeof colors],
    }),
    {},
  );
  const getColor = (label: string) => {
    // console.log(label, "/????");
    return colorLabels[label];
  };
  // console.log(colorLabels)
  // const values = Object.values(subvalues).flat().map(({value} : any) => value);
  const sums = subvalues.map((values) =>
    values.reduce(
      (value: number, cur: any) => (value += cur.value as number),
      0,
    ),
  );

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.2);
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...sums)])
    .range([height, 0]);

  function calcY(index: number, values: any[]) {
    values.splice(index, values.length - index);
    const y = scaleY(
      values.reduce((sum: number, cur: any) => (sum += cur.value as number), 0),
    );
    return y;
  }

  // useEffect (() => {
  //   setCur(parseData(data));
  // },[])

  useEffect(() => {
    if (axisBottomRef.current != null) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current != null) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
  }, [scaleX, scaleY]);

  useEffect(() => {
    setCur(parseData(data));

    // select the svg area
    const svg = d3
      .select('#viz-legend')
      .html('')
      .append('svg')
      .attr('width', window.innerWidth / 2)
      .attr('height', 50)
      .attr('viewBox', `0, 100, ${window.innerWidth / 2}, 70`);

    // show legend
    Object.keys(colorLabels).reduce((len: number, l: string, i: number) => {
      const name = l.split('|')[0];
      svg
        .append('circle')
        .attr('cx', 10 + len * 8 + i * 5)
        .attr('cy', 130)
        .attr('r', 6)
        .style('fill', `rgb(${colorLabels[l]})`);
      svg
        .append('text')
        .attr('x', 20 + len * 8 + i * 5)
        .attr('y', 130)
        .text(name)
        .style('font-size', '12px')
        .attr('alignment-baseline', 'middle');
      return (len += name.length);
    }, 0);
  }, [data]);

  return (
    <div>
      <div id="viz-legend"></div>
      <div className="flex flex-col items-center justify-center">
        <svg
          width={width + margin.left + margin.right + 100}
          height={height + margin.left + margin.right}
          viewBox={`-50 0 ${width + margin.left + margin.right} ${
            height + margin.left + margin.right
          }`}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
            <g ref={axisLeftRef} />
            {curData.map(({ label, values }, groupIndex) => (
              <g
                key={`rect-group-${groupIndex}`}
                transform={`translate(${scaleX(label)}, 0)`}
              >
                {values.map((tup: any, barIndex) => (
                  <Bar
                    key={`rect-${barIndex}`}
                    x={0}
                    // need to accumulate
                    // calculate y for different kinds
                    // inversed
                    y={
                      height -
                      calcY(barIndex, [...values]) +
                      (1 - sums[groupIndex] / Math.max(...sums)) * height
                    }
                    width={scaleX.bandwidth()}
                    height={height - scaleY(tup.value)}
                    color={`rgb(${
                      tup.value === mouseBar
                        ? colors.accent
                        : getColor(tup.label)
                    })`}
                    onMouseEnter={(event) => {
                      setMouseBar(tup.value);
                      setTooltip({
                        x: event.clientX,
                        y: event.clientY,
                        info: tup,
                      });
                    }}
                    onMouseLeave={() => {
                      setMouseBar(-1);

                      setTooltip(null);
                    }}
                  />
                ))}
              </g>
            ))}
          </g>
        </svg>
        <p className="mt-4 max-w-xl text-center text-xs">
          The production rate of meat in different countries of the world,
          classified by the different types of animals that are the most
          consumed, on hover over one bar.
        </p>
      </div>
      {tooltip !== null ? (
        <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          {/* <span className="tooltip__title">{tooltip.label}</span> */}
          <table className="tooltip__table">
            <thead>
              <tr>
                <td>{tooltip.info.label}</td>
              </tr>
            </thead>
            <tbody>
              <tr>{tooltip.info.value}</tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
