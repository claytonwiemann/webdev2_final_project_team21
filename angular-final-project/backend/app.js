const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
const { MongoClient, ServerApiVersion } = require('mongodb');

const currencyApiKey = '6f6de1d6e251d9e16afa3d70';
const weatherApiKey = 'ca4d16d1e367aa0f225c9499b35d369b'


const uri = "mongodb+srv://claywiemann:admin@cluster0.o33bknb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function recordServerDetails() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();

    // Access the final_project database
    const database = client.db('final_project');

    // Access the server_details collection
    const collection = database.collection('server_details');

    // Update the server_details collection with current timestamp and increment total count
    const today = new Date().toISOString().split('T')[0];

    await collection.updateOne(
      { date: today },
      {
        $setOnInsert: { date: today },
        $inc: { totalRequests: 1 }
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error updating server details:', error);
  } finally {
    // Close the MongoClient
    await client.close();
  }
}

async function getTotalRequestsCount() {
  try {
    await client.connect();
    const database = client.db('final_project');
    const collection = database.collection('server_details');
    const today = new Date().toISOString().split('T')[0];
    const result = await collection.findOne({ date: today });
    if (result) {
      return result.totalRequests || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total requests count:', error);
    return 0;
  } finally {
    await client.close();
  }
}

// Route to retrieve total requests count
app.get('/total-requests', async (req, res) => {
  const totalRequestsCount = await getTotalRequestsCount();
  console.log()
  res.json({ totalRequests: totalRequestsCount });
});



//Middleware to record server details before handling each request
app.use(async (req, res, next) => {
  await recordServerDetails(req);
  next();
});


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
    const latitude = req.query.lat;
    const longitude = req.query.lon;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and Longitude required' });
    }

    //OpenWeather api


    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

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
