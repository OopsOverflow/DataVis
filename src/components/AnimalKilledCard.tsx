import React from 'react';
import LiveCounter from '@components/LiveCounter';

interface AnimalKilledCardProps {
  name: string;
  image: string;
  rate: number;
}

const AnimalKilledCard = ({
  name,
  image,
  rate,
}: AnimalKilledCardProps): React.ReactElement => {
  return (
    <div className="tooltip-open" data-tip="tererew">
      <div className="flex w-64 min-w-full flex-row items-center justify-center space-x-5 rounded bg-white p-3 shadow-sm hover:shadow-md ">
        <img src={image} alt={name} className="h-14 w-14 opacity-60" />
        <div className="flex h-full w-full flex-col justify-center space-y-1 text-left">
          <h3 className="text-md font-bold">
            <LiveCounter rate={rate} classes={'text-lg'} />
          </h3>
          <p className="text-sm text-neutral">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalKilledCard;
