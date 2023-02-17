import React, { useEffect, useState } from 'react';
import { StackedBarChart } from './charts/StackedBarChart';
import { CloudPieChart } from '@charts/CloudPieChart';
import { WorldMap } from '@charts/WorldMap';
import { Info } from '@charts/Info';
import { type IGroupedData } from './type';
import Hero from '@components/Hero';
import StatsBlock from '@components/StatsBlock';
import AnimalsKilledList from '@components/AnimalsKilledList';
import { fetchData, fetchPieData, loadData, checkDataLoaded } from './loadDataRaw';
import { getCountryName } from './helpers';

// const GROUPED_BAR_CHART_DATA: IGroupedData[] = selectData;
// console.log(selectData[0])
// Mock Data


const stats = [
  {
    title: 'Tons Produced',
    value: '360000000',
    desc: 'of meat only in 2022',
  },
  {
    title: 'Animals Slaughtered',
    value: '80000000000',
    desc: '↗︎ (35.7%) 2010 - 2020',
  },
  {
    title: 'Greenhouse Gas Emissions',
    value: '57',
    desc: '% of food-related emissions (GHG, 2021)',
  },
];

function App(): React.ReactElement {
  const [barChartData, setBarChart] = useState<IGroupedData[]>([]);
  const [pieChartData, setPieChart] = useState<IGroupedData[]>([]);
  const [year, setYear] = useState<string>('2019');
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
    // window.countries = ['GBR', 'USA', 'FRA', 'CHN','TCD', 'AUS', 'RUS'];

    void (async () => {
      console.log('loading data...');
      await loadData();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkDataLoaded('meat_prod')) setDataLoaded(true);
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
        const d: IGroupedData = await fetchData(getCountryName(c), year);
        temp.push(d);
      }
      setBarChart([...temp]);
      console.log(barChartData);
    })();
  }, [dataLoaded, countries, year]);


  useEffect(() => {

    console.log(fetchPieData())

    setPieChart([...fetchPieData()]);
    console.log("set pie")

  }, [dataLoaded])

  const HandleCountryChange = (changed: string[]) => {
    setCountries([...changed]);
  };

  return (
    <>
      <Hero />
      <div className="flex h-full w-full flex-col items-center justify-center bg-base-200 p-10 text-center md:p-20">
        <p className="m-2 text-lg md:m-5 md:max-w-4xl">
          The meat on your plate carries a heavy burden - from ethical concerns
          about animal cruelty, to environmental pollution and financial costs.
          Be informed about the true impact of meat consumption and make
          informed choices based on the facts.
        </p>
        <StatsBlock stats={stats} />
        <p className="m-2 w-full text-lg md:m-5 md:max-w-4xl">
          The OECD countries recorded the highest per capita meat consumption in
          the period from 2019 to 2021, with an average of 69.5 kilograms of
          retail weight per person.
        </p>
      </div>
      <div className="flex h-full w-full flex-col items-center  justify-center">
        <div className="flex flex-row">
          <Info />
          <CloudPieChart data={pieChartData} />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center md:p-20">
          <input
            type="range"
            min="2010"
            max="2019"
            value={year}
            onChange={(event) => {
              setYear(event.target.value)
            }}
            className="range"
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        <StackedBarChart data={barChartData} />
        <WorldMap countries={countries} onChange={HandleCountryChange} />
        {/* <p>Hover over the bars to see the values</p> */}
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center bg-base-200 p-10 text-center md:p-20">
        <AnimalsKilledList />
      </div>
    </>
  );
}

export default App;

// {
//   "China":
//   {2019: {data},
// 2018: {data}}
// }
