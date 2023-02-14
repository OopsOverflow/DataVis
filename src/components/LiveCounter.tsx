import React, { useEffect, useState } from 'react';

const LiveCounter = ({ classes, rate }: { classes?: string; rate: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + rate);
    }, 300 + Math.random() * 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedCount = count
    .toFixed()
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div>
      <h4 className={`mb-0 flex-grow font-bold ${classes}`}>
        {formattedCount}
      </h4>
    </div>
  );
};

export default LiveCounter;
