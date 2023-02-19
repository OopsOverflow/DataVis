import React, { useEffect, useState } from 'react';
import { StackedBarChart } from './charts/StackedBarChart';
import { CloudPieChart } from '@charts/CloudPieChart';
import { WorldMap } from '@charts/WorldMap';
import { Info } from '@charts/Info';
import { type IGroupedData } from './type';
import Hero from '@components/Hero';
import AnimalsKilledList from '@components/AnimalsKilledList';
import {
  checkDataLoaded,
  fetchData,
  fetchPieData,
  loadData,
} from './loadDataRaw';
import { getCountryName } from './helpers';
import AnimalStats from '@components/AnimalStats';
import HibaCard from '@components/HibaCard';

// const GROUPED_BAR_CHART_DATA: IGroupedData[] = selectData;
// console.log(selectData[0])
// Mock Data

function App(): React.ReactElement {
  const [barChartData, setBarChart] = useState<IGroupedData[]>([]);
  const [pieChartData, setPieChart] = useState<IGroupedData[]>([]);
  const [year, setYear] = useState<string>('2015');
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([
    'GBR',
    'USA',
    'FRA',
    'CHN',
    'TCD',
    'AUS',
    'RUS',
  ]);

  useEffect(() => {
    void (async () => {
      console.log('loading data...');
      await loadData();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkDataLoaded('meat_prod') && checkDataLoaded('food_emission'))
        setDataLoaded(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    console.log('fetching data...');
    // const { countries } = window;

    const temp: IGroupedData[] = [];
    void (async () => {
      for (const c of countries) {
        if (getCountryName(c)) {
          const d: IGroupedData = await fetchData(getCountryName(c), year);
          temp.push(d);
        }
      }
      setBarChart([...temp]);
      // console.log(barChartData);
    })();
  }, [dataLoaded, countries, year]);

  useEffect(() => {
    // console.log(fetchPieData())
    void (async () => {
      setPieChart([...(await fetchPieData())]);
      console.log('set pie');
    })();
  }, [dataLoaded]);

  const HandleCountryChange = (changed: string[]) => {
    setCountries([...changed]);
  };

  return (
    <>
      <Hero />

      <div className="flex h-full w-screen flex-col  items-center justify-center md:p-20">
        <div className="flex w-full flex-initial flex-row">
          <Info />
          <div className="ml-auto">
            <CloudPieChart data={pieChartData} />
          </div>
        </div>

        <div className="flex h-full w-full flex-row items-center justify-center">
          <StackedBarChart data={barChartData} />
          <WorldMap countries={countries} onChange={HandleCountryChange} />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center text-center md:p-10">
          <input
            type="range"
            min="2010"
            max="2019"
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
            }}
            className="range range-primary range-xs"
          />
          <div className="flex w-full justify-between px-2 text-xs">
            {Array.from({ length: 10 }, (v, i) => i).map((y) => (
              <span key={y}>|{2010 + y}</span>
            ))}
          </div>
        </div>

        {/* <p>Hover over the bars to see the values</p> */}
      </div>

      <AnimalStats />

      <div className="flex h-full w-full flex-col items-center justify-center bg-base-200 p-10 text-center md:p-20">
        <AnimalsKilledList />
      </div>

      <HibaCard />
    </>
  );
}

export default App;

// {
//   "China":
//   {2019: {data},
// 2018: {data}}
// }
