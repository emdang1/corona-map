const globalAndCountriesURL = 'https://api.covid19api.com/';
const mapCountriesURL = 'https://www.trackcorona.live/api/countries';

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${globalAndCountriesURL}/summary`);
    const data = await response.json();
    return data.Countries;
  } catch (error) {
    console.log(error);
  }
};
export const fetchGlobalData = async () => {
  try {
    const response = await fetch(`${globalAndCountriesURL}/world/total`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryData = async (country, endDate) => {
  try {
    const response = await fetch(
      `${globalAndCountriesURL}/total/country/${country}?from=2020-03-15T00:00:00Z&to=${endDate}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMapCountries = async () => {
  try {
    const response = await fetch(mapCountriesURL);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
