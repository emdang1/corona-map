import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard/Dashboard';
import CountryList from './CountryList/CountryList';
import Chart from './Chart/Chart';
import { fetchCountries, fetchGlobalData } from '../api/api';

const Home = () => {
  const [countries, setCountries] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchInitial = async () => {
      setCountries(await fetchCountries());
      setGlobalData(await fetchGlobalData());
    };

    fetchInitial();
  }, []);

  const onChangePickHandler = (e) => {
    const value = e.target.value;
    if (value === 'global') {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(e.target.value);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Corona tracker</h1>
      <Dashboard
        country={selectedCountry}
        countries={countries}
        globalData={globalData}
      />
      <CountryList countries={countries} change={onChangePickHandler} />
      <Chart country={selectedCountry} />
    </>
  );
};

export default Home;
