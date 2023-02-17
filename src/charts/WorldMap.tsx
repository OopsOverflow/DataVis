import React, { type ReactElement, useEffect, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import colors from './colors.json';

interface Props {
  countries: string[];
  onChange: any;
}

export function WorldMap({ countries, onChange} : Props): ReactElement<SVGSVGElement> {
  const [worldData, setWorldData] = useState([]);
  const projection = () => geoMercator().scale(127).translate([400, 300]);
  const [selected, setSelect] = useState<any[]>([]);

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
      .then((data: any) => {
        // console.log(data)
        setSelect([...countries]);
        setWorldData((feature(data, data.objects.countries1) as any).features);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    onChange(selected);
  }, [selected])


  return (
    <div>
      <svg width={window.innerWidth * 0.5} height={450} viewBox="0 -100 1000 600">
        <g className="countries">
          {worldData.map((d: any, i) => {
            const { id } = d;

            return (
              <path
                key={`path-${i}`}
                d={geoPath().projection(projection())(d) ?? 'undefined'}
                fill={selected.includes(id) ? `rgb(${colors.warning})` : `rgb(${colors.accent})`}
                stroke={`rgb(${colors.primary})`}
                strokeWidth={1}
                onClick={() => {
                  if (selected.includes(id))
                    setSelect(selected.filter((s: any) => s !== id));
                  else setSelect([...selected, id]);
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
