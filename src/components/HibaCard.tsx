import { useEffect, useState } from 'react';

const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // month is zero-based
const startOfWeek = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - now.getDay(),
);
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const rate = 11;

const tabs: Record<
  string,
  {
    value: number;
    sub: string;
  }
> = {
  'IN 2023': {
    value: ((now.getTime() - startOfYear.getTime()) / 1000) * rate,
    sub: `Growth, so far in ${new Date().getFullYear()}`,
  },
  'THIS MONTH': {
    value: ((now.getTime() - startOfMonth.getTime()) / 1000) * rate,
    sub: 'Growth, so far in February',
  },
  'THIS WEEK': {
    value: ((now.getTime() - startOfWeek.getTime()) / 1000) * rate,
    sub: 'Since the beginning of this week',
  },
  TODAY: {
    value: ((now.getTime() - startOfDay.getTime()) / 1000) * rate,
    sub: 'Growth, so far today',
  },
};

const HibaCard = () => {
  const [counters, setCounters] = useState(tabs);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters: any) => {
        const newCounters: Record<
          string,
          {
            value: number;
            sub: string;
          }
        > = {};
        for (const [key, value] of Object.entries(prevCounters)) {
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          newCounters[key] = { ...value, value: value.value + rate };
        }
        return newCounters;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [activeTab, setActiveTab] = useState('THIS MONTH');

  const handleClick = (e: any) => {
    setActiveTab(e.target.text);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center md:p-20">
      <div className="m-2 text-lg md:m-5 md:max-w-4xl">
        <p className="mt-5 text-6xl font-medium">
          {
            // drop the fraction
            counters[activeTab].value.toLocaleString().split('.')[0]
          }
        </p>
        <p className="mt-5 text-6xl font-extrabold">
          <span className="font-bold">Tons</span> of meat consumed
        </p>
        <p className="mt-5 text-2xl font-light">{tabs[activeTab].sub}</p>
      </div>
      <div className="tabs tabs-boxed mt-6 gap-5 bg-white">
        {Object.keys(tabs).map((tab) => (
          <a
            key={tab}
            className={`tab rounded-md ${
              tab === activeTab ? 'tab-active' : 'text-gray-600 hover:bg-accent'
            }`}
            onClick={handleClick}
          >
            {tab}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HibaCard;
