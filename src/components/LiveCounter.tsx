import React, { useEffect, useState } from 'react';

const LiveCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 60.4);
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
      <h4 className="mb-0 flex-grow text-3xl font-bold text-accent">
        {formattedCount}
      </h4>
    </div>
  );
};

export default LiveCounter;
