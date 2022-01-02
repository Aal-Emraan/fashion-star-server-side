const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: FashionStar
// pass: ZK1xzkKeYGMqFpye

const uri =
  "mongodb+srv://FashionStar:ZK1xzkKeYGMqFpye@cluster0.m9udz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("database connected succesfully");
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello from fashionstar");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
