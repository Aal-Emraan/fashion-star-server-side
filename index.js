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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m9udz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("database connected succesfully");

    const database = client.db("fashionStar");
    const allProducts = database.collection("allProducts");
    const users = database.collection("users");
    const orders = database.collection("orders");

    // ---------- add user ------------

    // --------------------------------

    // ================ Section for All Products ===========

    app.get("/products", async (req, res) => {
      const Products = await allProducts.find({}).toArray();
      res.json(Products);
    });
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await allProducts.findOne(query);
      res.json(product);
    });
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // const product = await allProducts.deleteOne(query);
      res.json({ _id: id });
    });
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const data = req.body;
      const updateDoc = {
        $set: {
          ...data,
        },
      };
      const result = await allProducts.updateOne(query, updateDoc);
      console.log(result);
    });
    // orders 
    app.post('/orders', async (req, res) => {
      const data = req.body
      const result = await orders.insertMany(data);
      console.log(result);
      res.json(result);
    })
    app.get('/orders/:email', async (req, res) => {
      const email = req.query.email
      const query = {
        email
      }
      const result = await orders.find(query).toArray();
      res.json(result)

    })

    // -----------------------------------------------------

    // ================ Section for watches ================

    app.get("/watches", async (req, res) => {
      const query = { category: "watch" };
      const watches = await allProducts.find(query).toArray();
      res.json(watches);
    });
    // app.get("/watches/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { category: "watch" };
    //   const watches = await allProducts.find(query).toArray();
    //   res.json(watches);
    // });

    // -----------------------------------------------------

    // ================ Section for glasses ================

    app.get("/glasses", async (req, res) => {
      const query = { category: "glass" };
      const glasses = await allProducts.find(query).toArray();
      res.json(glasses);
    });
    app.get("/getProducts", async (req, res) => {
      const category = req.query?.category;
      const query = { category };
      const products = await allProducts.find(query).toArray();
      res.json(products);
    });

    // -----------------------------------------------------

    // ================ Section for jewelaries ===============

    app.get("/jewellaries", async (req, res) => {
      const query = { category: "Jewellery" };
      const jewellery = await allProducts.find(query).toArray();
      res.json(jewellery);
    });

    app.get("/jewelleries/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const service = await allProducts.findOne(query);
      console.log(service);
      res.json(service);
    });

    // -------------------------------------------------------

    // ******************* Dashboard ***********************
    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await users.insertOne(user);
      console.log(result);
      res.json(result);
    });
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email }
      const user = await users.findOne(query);
      let isAdmin = false;
      console.log(user);
      if (user?.role === 'admin') {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });

    // *****************************************************
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

// heroku link:  https://thawing-plateau-57038.herokuapp.com
