import React from 'react';
import { Chart } from 'react-google-charts';
import { useStreet } from './components/StreetSelector';

const processData = (data, selectedStreet) => {
  const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "pH", "Nitrates", "Nitrites"];
  
  const filteredData = data.filter((entry) => entry.Street === selectedStreet);

  const rows = filteredData.map((entry) => [
    new Date(entry.DATE).toLocaleDateString(),  // Convert DATE to locale date string for bar chart
    entry["Total Chlorine Residual"],
    entry["Free Chlorine"],
    entry["Monochloramine"],
    entry["Free Ammonia"],
    entry.pH,
    entry.Nitrates,
    entry.Nitrites,
  ]);

  return [headers, ...rows];
};

const BarChart = ({ data }) => {
  const { selectedStreet } = useStreet();
  const chartData = selectedStreet ? processData(data, selectedStreet) : [];

  const options = {
    title: 'Water Quality Over Time',
    legend: { position: 'bottom' },
    bars: 'vertical', // Required for Material Bar Charts.
    vAxis: { format: 'decimal' },
  };

  return (
    <div>
      Coming soon...
      {/* {selectedStreet ? (
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      ) : (
        <p>Please select a street to view the data.</p>
      )} */}
    </div>
  );
};

export default BarChart;
