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
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("personnel");
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

app.post("/personnel", (request, response) => {
  collection.insertOne(request.body, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result.result)
  });
});

app.get("/personnel", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/personnel/:id", (request, response) => {
  collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});
