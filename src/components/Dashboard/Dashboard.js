import React from 'react';
import Card from './Card/Card';
import './Dashboard.css';

const Dashboard = ({ country, countries, globalData }) => {
  let totalData = globalData;

  if (country) {
    totalData = countries.find((item) => item.CountryCode === country);
  }

  return totalData ? (
    <div className='dashboard'>
      <Card
        type='confirmed'
        title='Confirmed'
        data={totalData.TotalConfirmed}
      ></Card>
      <Card type='deaths' title='Deaths' data={totalData.TotalDeaths}></Card>
      <Card
        type='recovered'
        title='Recovered'
        data={totalData.TotalRecovered}
      ></Card>
    </div>
  ) : null;
};

export default Dashboard;
