// create a StatsBlock component that takes an array of stats as a prop
// the array of stats should be an array of objects with a name and value and a description
// the component should render a div with a class of stat
import React from 'react';
import AnimatedCounter from '@components/AnimatedCounter';

export interface StatProps {
  title: string;
  value: number | string;
  desc: string;
}

const StatsBlock: React.FC<{ stats: StatProps[] }> = ({ stats }) => {
  return (
    <div className="flex flex-col items-center justify-center md:max-w-4xl md:flex-row md:space-x-10">
      {stats.map((stat, key) => (
        <div className="stat place-items-center" key={key}>
          <div className="stat-title">{stat.title}</div>
          <div className={`stat-value ${key % 2 ? 'text-accent' : ''}`}>
            <AnimatedCounter target={Number(stat.value)} time={2000} />
          </div>
          <div className={`stat-desc ${key % 2 ? 'text-info' : ''}`}>
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBlock;
