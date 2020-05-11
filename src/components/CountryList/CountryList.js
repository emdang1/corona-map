import React from 'react';
import './CountryList.css';

const CountryList = ({ change, countries }) => {
  let countryIsoNameArray = [];

  countries &&
    countries.map((country) =>
      countryIsoNameArray.push({
        name: country.Country,
        iso: country.CountryCode,
      })
    );

  return countryIsoNameArray[0] ? (
    <div className='countryList'>
      <select name='country' id='countrylist' onChange={change}>
        <option value='global'>Global</option>
        {countryIsoNameArray.map((country) => (
          <option key={country.name} value={country.iso}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <h4 style={{ textAlign: 'center' }}>
      Country list load error, please refresh the page
    </h4>
  );
};

export default CountryList;
