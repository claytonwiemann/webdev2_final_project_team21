const express = require('express');
const axios = require('axios');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const currencyApiKey = '6f6de1d6e251d9e16afa3d70';



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
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
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



app.get('/', (req, res) => {
  res.send('Showing app.get() works');
});

module.exports = app;
