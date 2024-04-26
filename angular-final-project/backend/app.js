const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

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




app.get('/', (req, res) => {
  res.send('Showing app.get() works');
});

module.exports = app;
