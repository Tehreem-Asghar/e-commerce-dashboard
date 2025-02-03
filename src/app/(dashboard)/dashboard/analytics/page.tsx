// app/analytics/page.tsx
import React from 'react';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';


const AnalyticsPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <BarChart />
      {/* <h1 className='my-24'>sales</h1>
      <LineChart/> */}
    </div>
  );
};

export default AnalyticsPage;