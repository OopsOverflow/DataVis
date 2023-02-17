import React, { useEffect, useState } from 'react';
// import { GroupedBarChart } from '@charts/GroupedBarChart';
import { StackedBarChart } from './charts/StackedBarChart';
import { CloudPieChart } from '@charts/CloudPieChart';
import { WorldMap } from '@charts/WorldMap';
import { Info } from '@charts/Info';
import { type IGroupedData } from './type';
import Hero from '@components/Hero';
import StatsBlock from '@components/StatsBlock';
import AnimalsKilledList from '@components/AnimalsKilledList';
import { fetchData, loadData, checkDataLoaded } from './loadDataRaw';
import { getCountryName } from './helpers';

// const GROUPED_BAR_CHART_DATA: IGroupedData[] = selectData;
// console.log(selectData[0])
// Mock Data

const GROUPED_PIE_CHART_DATA: IGroupedData[] = [
  { label: 'Chicken (per kg)', values: [39.72, 0.468, 2.37, 19.508] },
  { label: 'Beef (per kg)', values: [99.48, 16.278, 1.878, 39.388] },
  { label: 'Fish (per kg)', values: [13.63, 0.534, 0.819, 3.598] },
];

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
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>(['GBR', 'USA', 'FRA', 'CHN','TCD', 'AUS', 'RUS']);

  useEffect(() => {
    // window.countries = ['GBR', 'USA', 'FRA', 'CHN','TCD', 'AUS', 'RUS'];


    void (async () => {
      console.log("loading data...")
      await loadData();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if(checkDataLoaded('meat_prod')) setDataLoaded(true);
    }, 1000);
  
    return () => { clearInterval(interval)};
  })

  useEffect(() => {
    console.log("fetching data...")
    // const { countries } = window;

    const temp: IGroupedData[] = [];
    void (async () => {
      
      for (const c of countries) {
        const d: IGroupedData = await fetchData(
          getCountryName(c),
          '2019'
        );
        temp.push(d);
      }
      setBarChart([...temp]);
      console.log(barChartData);

    })();
  }, [dataLoaded, countries]);

  const HandleCountryChange = (changed: string[]) => {
    setCountries([...changed]);
  }

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
        <div className='flex flex-row'>
          <Info />
          <CloudPieChart data={GROUPED_PIE_CHART_DATA} />
        </div>

        <StackedBarChart data={barChartData} />
        <WorldMap countries={countries} onChange={HandleCountryChange}/>
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
