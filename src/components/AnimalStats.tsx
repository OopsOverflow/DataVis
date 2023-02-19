import StatsBlock from '@components/StatsBlock';
import React from 'react';

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

const AnimalStats = () => {
  return (
    <div
      className="hero bg-base-200"
      style={{
        backgroundImage: `url("./sheep.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-white">
        <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center md:p-20">
          <p className="m-2 text-lg md:m-5 md:max-w-4xl">
            The meat on your plate carries a heavy burden - from ethical
            concerns about animal cruelty, to environmental pollution and
            financial costs. Be informed about the true impact of meat
            consumption and make informed choices based on the facts.
          </p>
          <StatsBlock stats={stats} />
          <p className="m-2 w-full text-lg md:m-5 md:max-w-4xl">
            The OECD countries recorded the highest per capita meat consumption
            in the period from 2019 to 2021, with an average of 69.5 kilograms
            of retail weight per person.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalStats;
