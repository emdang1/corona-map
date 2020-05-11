import React, { useEffect, useState } from 'react';
import './Chart.css';
import { Line } from 'react-chartjs-2';
import { fetchCountryData } from '../../api/api';

const Chart = ({ country }) => {
  const [chartData, setChartData] = useState(null);

  let endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);
  endDate = endDate.toISOString();

  useEffect(() => {
    const fetchChartData = async () => {
      if (country) {
        setChartData(await fetchCountryData(country, endDate));
      } else {
        setChartData(null);
      }
    };

    fetchChartData();
  }, [country]);

  const lineChart = chartData ? (
    <div className='chart'>
      <Line
        data={{
          labels: chartData.map((item) => {
            let date = new Date(item.Date).toLocaleDateString();
            return date;
          }),
          datasets: [
            {
              data: chartData.map((item) => item.Confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: chartData.map((item) => item.Deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
            {
              data: chartData.map((item) => item.Recovered),
              label: 'Recovered',
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              fill: true,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: `Current state in ${country} | click legend to interact`,
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: true,
                  color: '#FFFFFF',
                },
              },
            ],
          },
        }}
      />
    </div>
  ) : (
    <div className='defaultChartContainer'>
      <h3>Choose a country to show detailed graph</h3>
    </div>
  );
  return lineChart;
};

export default Chart;
