import React from 'react';
import LiveCounter from '@components/LiveCounter';

interface AnimalKilledCardProps {
  name: string;
  image: string;
  rate?: number;
  lifeSpan?: string;
  naturalLifeSpan?: string;
  lifePercent?: number;
}

const FrontCard = ({
  name,
  image,
  rate,
}: AnimalKilledCardProps): React.ReactElement => {
  return (
    <>
      <img src={image} alt={name} className="h-14 w-14 opacity-60" />
      <div className="flex h-full w-full flex-col justify-center space-y-1 text-left">
        <h3 className="text-md font-bold">
          <LiveCounter rate={rate ?? 0} classes={'text-lg'} />
        </h3>
        <p className="text-sm text-neutral">{name}</p>
      </div>
    </>
  );
};

const BackCard = ({
  name,
  image,
  naturalLifeSpan,
  lifeSpan,
  lifePercent,
}: AnimalKilledCardProps): React.ReactElement => {
  return (
    <>
      <div
        className="border-1 radial-progress absolute left-1.5 border-primary border-primary bg-base-200 text-primary"
        style={{
          // @ts-expect-error
          '--value': lifePercent,
          '--size': '5.3rem',
          '--thickness': '0.5rem',
        }}
      ></div>
      <img
        src={image}
        alt={name}
        className="relative -left-4 h-12 w-12 opacity-80"
      />

      <div className="flex h-full w-full flex-col justify-center text-left">
        <h3 className="text-md font-bold text-primary">{lifeSpan}</h3>
        <h4 className="mb-1 text-sm font-bold text-neutral">
          {naturalLifeSpan}
        </h4>
        <p className="text-sm text-neutral">{name}</p>
      </div>
    </>
  );
};

const AnimalKilledCard = ({
  name,
  image,
  rate,
  lifePercent,
  naturalLifeSpan,
  lifeSpan,
}: AnimalKilledCardProps): React.ReactElement => {
  return (
    <div className="group cursor-pointer perspective">
      <div className="relative h-full w-full duration-1000 preserve-3d group-hover:my-rotate-y-180">
        <div className="h-30 flex w-64 min-w-full flex-row items-center justify-center space-x-5 rounded bg-white p-6 shadow-sm backface-hidden hover:shadow-md">
          <FrontCard name={name} image={image} rate={rate} />
        </div>
        <div className="absolute top-0 flex w-64 min-w-full flex-row items-center justify-center space-x-5 overflow-hidden rounded bg-white p-5 my-rotate-y-180 backface-hidden hover:shadow-md">
          <BackCard
            name={name}
            image={image}
            lifeSpan={lifeSpan}
            naturalLifeSpan={naturalLifeSpan}
            lifePercent={lifePercent}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalKilledCard;
