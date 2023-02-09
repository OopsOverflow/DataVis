import React, { useEffect, useState } from 'react';
import { GroupedBarChart } from '@charts/GroupedBarChart';
import { CloudPieChart } from '@charts/CloudPieChart';
import { type IGroupedData } from './type';

const GROUPED_BAR_CHART_DATA: IGroupedData[] = [
  { label: 'Apples', values: [60, 80, 100] },
  { label: 'Bananas', values: [160, 200, 120] },
  { label: 'Oranges', values: [60, 40, 10] },
];

interface Props {
  initialValue: number;
  factor: number;
}

const AnimatedCounter: React.FC<Props> = ({ initialValue, factor }) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + factor);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [factor]);

  return (
    <h1 className="mt-3 animate-pulse font-mono text-4xl text-red-500">
      {count}
    </h1>
  );
};

function App(): React.ReactElement {
  return (
    <>
      <div
        className="hero h-[75vh] bg-base-200"
        style={{
          backgroundImage: `url("./cows.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-6xl font-bold">Meat Consumption</h1>
            <h2 className="mb-5 text-2xl font-bold">
              ... and its effects on society and the environment
            </h2>
            <p className="mb-5">
              Humans use animal flesh known as “meat” as a food source. And as a
              consequence, meat has always been at the center of the discussion,
              from ethics to environmental.
            </p>
            <div className="down-arrow"></div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center bg-base-200 p-40 text-center">
        <p className="m-5 max-w-4xl text-lg">
          The meat consumption worldwide has been estimated to have grown by 60
          percent between 1990 and 2009, with a rise of 25% in consumption per
          capita. In 2022, x tons of meat were produced, of which x tons was
          consumed.
        </p>
        <div className="flex max-w-4xl flex-row items-center justify-center space-x-10">
          <div className="stat place-items-center">
            <div className="stat-title">Tons Produced</div>
            <div className="stat-value">35K</div>
            <div className="stat-desc">Since 2018</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Animals Killed</div>
            <div className="text-col stat-value text-red-500">4,200</div>
            <div className="stat-desc text-red-400">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">CO2 Produced</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
        <p className="mt-6 max-w-4xl text-lg">
          Cows killed since you started reading this article
        </p>
        <AnimatedCounter initialValue={0} factor={10} />
      </div>
      <div>
        <GroupedBarChart data={GROUPED_BAR_CHART_DATA} />
        <p>Hover over the bars to see the values</p>
        <CloudPieChart data={GROUPED_BAR_CHART_DATA} />
      </div>
    </>
  );
}

export default App;
