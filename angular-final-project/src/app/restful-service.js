const axios = require('axios');

const baseURL = 'http://localhost:3000';

//Function to fetch exchange rates from the backend API
async function fetchExchangeRates(baseCurrency) {
  try {
    const response = await axios.get(`${baseURL}/exchange-rates/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

//Function to fetch weather data from the backend API
async function fetchWeather(city) {
  try {
    const response = await axios.get(`${baseURL}/weather`, {
      params: {
        city: city
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

module.exports = {
  fetchExchangeRates,
  fetchWeather
};
