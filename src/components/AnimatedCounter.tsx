import React, { useEffect, useState } from 'react';

interface Props {
  target: number;
  time?: number;
  start?: number;
}

const AnimatedCounter: React.FC<Props> = ({
  target,
  time = 200,
  start = 0,
}) => {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    const increment = (target - start) / time;
    const handle = setInterval(() => {
      if (current < target) {
        setCurrent(current + increment);
      } else {
        clearInterval(handle);
        setCurrent(target);
      }
    }, 1);

    return () => {
      clearInterval(handle);
    };
  }, [current, target, start, time]);

  return (
    <h4 className="mb-0 flex-grow text-3xl font-bold">
      {current.toLocaleString()}
    </h4>
  );
};

export default AnimatedCounter;
