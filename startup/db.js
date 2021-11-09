const mongoose = require('mongoose'); 
const config = require('config');
 
 

const { MongoClient } = require("mongodb");
const client = new MongoClient(config.get("mongoURI"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function makeClient() {
  let conn;
  try {
    conn = await client.connect();
  } catch (err) {
    console.log(`Could not connect to MongoDB. ERROR: ${err}`);
    process.exit(1);
  }
  return conn;
}

function connectDB() {
  mongoose
    .connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => {
      console.log(`Could not connect to MongoDB. ERROR: ${err}`);
      process.exit(1);
    });
}

module.exports = { connectDB, makeClient };