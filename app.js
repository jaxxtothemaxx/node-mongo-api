require('dotenv').config();
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const CONNECTION_URL = process.env.CONNECTION_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;


let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.listen(5000, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("personnel");
    console.log("Connected to `" + DATABASE_NAME + "`!");
  })
});
