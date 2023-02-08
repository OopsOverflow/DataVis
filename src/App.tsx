import React from 'react';
import { GroupedBarChart } from '@charts/GroupedBarChart';
import { CloudPieChart } from '@charts/CloudPieChart';
import { type IGroupedData } from './type';
import Header from '@components/Header';

const GROUPED_BAR_CHART_DATA: IGroupedData[] = [
  { label: 'Apples', values: [60, 80, 100] },
  { label: 'Bananas', values: [160, 200, 120] },
  { label: 'Oranges', values: [60, 40, 10] },
];
function App(): React.ReactElement {
  return (
    <>
    <Header />
    <div>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 10,
        }}
      >
        Re-Establishing the USSR to please Karl Marx
      </h1>
      <GroupedBarChart data={GROUPED_BAR_CHART_DATA} />
      <p>Hover over the bars to see the values</p>
      <CloudPieChart  data={GROUPED_BAR_CHART_DATA} />
    </div>
    </>
  );
}

export default App;
