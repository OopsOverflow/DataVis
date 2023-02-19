import React, { type ReactElement, useEffect, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import colors from './colors.json';
import { fetchData, fetchPieData } from '../loadDataRaw';
import { getCountryName } from '../helpers';
import { IGroupedData } from '@type/index';
import kinds from '../../public/data/kinds.json';

interface Props {
  countries: string[];
  onChange: any;
  year: string;
  emission: IGroupedData[];
}

interface Tooltip {
  x: number;
  y: number;
  info: any;
  value: number;
}

export function WorldMap({
  countries,
  onChange,
  year,
  emission,
}: Props): ReactElement<SVGSVGElement> {
  const [worldData, setWorldData] = useState([]);
  const projection = () => geoMercator().scale(127).translate([400, 300]);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [selected, setSelect] = useState<any[]>([]);
  const [emissionData, setEmission] = useState<any>({});

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json',
    )
      .then((response: any) => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`);
          return;
        }
        return response.json();
      })
      .then(async (data: any) => {
        // console.log(data)
        setSelect([...countries]);
        setWorldData((feature(data, data.objects.countries1) as any).features);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log(worldData)
    (async() =>{
      const labels = Object.keys(kinds);
      const emData : any = {};
      for (const c of worldData) {
        const id = (c as any).id;
        let sum = 0;

        if (getCountryName(id)) {
          const d: IGroupedData = await fetchData(getCountryName(id), year);
          // console.log(d);
          // setEmission()
          d.values.forEach((v: any) => {
            if (v.label === 'Meat, Total | tonnes') return;
            const l: any = labels.find((key) =>
              kinds[key as keyof typeof kinds].includes(v.label),
            );
            // console.log(v.value)
            const emD: IGroupedData = emission.find((e) => e.label === l);
            sum += Math.floor(emD.values[0] * v.value * 1000);

          });
        }
        emData[id] = sum;
      }

      setEmission(emData)
    })()

  }, [worldData]);

  useEffect(() => {
    onChange(selected);
    // console.log(emissionData)
  }, [selected]);

  return (
    <div>
      <svg
        width={window.innerWidth * 0.5}
        height={450}
        viewBox={`100 -100 ${window.innerWidth * 0.5} 600`}
      >
        <g className="countries">
          {worldData.map((d: any, i) => {
            const { id } = d;

            return (
              <path
                key={`path-${i}`}
                d={geoPath().projection(projection())(d) ?? 'undefined'}
                fill={
                  selected.includes(id)
                    ? `rgb(${colors.warning})`
                    : `rgb(${colors.accent})`
                }
                stroke={`rgb(${colors.dark})`}
                strokeWidth={emissionData[id]/250000000000}
                onClick={() => {
                  if (selected.includes(id))
                    setSelect(selected.filter((s: any) => s !== id));
                  else setSelect([...selected, id]);
                }}
                onMouseEnter={(event) => {
                  setTooltip({
                    x: event.clientX,
                    y: event.clientY,
                    info: id,
                    value: emissionData[id]
                  });
                }}
                onMouseLeave={() => {
                  setTooltip(null);
                }}
              />
            );
          })}
        </g>
      </svg>
      {tooltip !== null ? (
        <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          <span className="tooltip__title">{tooltip.info}</span>
          <table className="tooltip__table">
            <thead>
              <tr>
                <td>GHG Emission</td>
              </tr>
            </thead>
            <tbody>
              <tr>{tooltip.value}</tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
