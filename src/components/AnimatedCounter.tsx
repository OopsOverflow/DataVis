import React, { useEffect, useState } from 'react';

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

export default AnimatedCounter;
