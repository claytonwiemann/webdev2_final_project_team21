const axios = require('axios');
const fetch = require('node-fetch');

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


async function fetchWeatherByCoordinates(latitude, longitude) {
  try {
    const response = await fetch(`http://localhost:3000/weather?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}


module.exports = {
  fetchExchangeRates,
  fetchWeatherByCoordinates
};
