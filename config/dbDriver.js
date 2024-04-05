const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
// Database Name
const dbName = "hims-client";

// exports.connect = async () => {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   return client.db(dbName);
// };

module.exports = {
  client,
  dbName,
};
