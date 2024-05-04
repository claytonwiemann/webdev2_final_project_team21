const express = require('express');
const axios = require('axios');
const fetch = require('node-fetch');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const currencyApiKey = '6f6de1d6e251d9e16afa3d70';
const weatherApiKey = 'ca4d16d1e367aa0f225c9499b35d369b'


const uri = "mongodb+srv://claywiemann:tpqxzX3yYtoxoOtr@cluster0.o33bknb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Atlas mongoDB connected!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


async function fetchExchangeRates(baseCurrency) {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${currencyApiKey}/latest/${baseCurrency}`);
    if (response.data.result === 'success') {
      return response.data.conversion_rates;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}


//basic currency conversion. Will return json text that will have each conversion from the :baseCurrency
//example http://localhost:3000/exchange-rates/USD
app.get('/exchange-rates/:baseCurrency', async (req, res) => {
  const baseCurrency = req.params.baseCurrency;
  const rates = await fetchExchangeRates(baseCurrency);//just getting the data from the exchangerate-api and using axios to call it
  if (rates) {
    res.json(rates);
  } else {
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});



app.get('/weather', async (req, res) => {
  try {
    //city param for the api
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    //OpenWeather api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    //returned json data from the call
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});


app.get('/', (req, res) => {
  res.send('Showing app.get() works');
});

module.exports = app;
