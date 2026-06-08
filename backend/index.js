const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("hireloopDB");
    const newJobsCollection = db.collection("newJobs");


    app.get("/api/jobs", async(req, res) => {
        const query = req.query;

        if(req.query.companyId) {
            query.companyId = req.query.companyId;
        }

        const cursor = await newJobsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })

    // Inset New Jobs Data on MongoDB
    app.post("/api/jobs", async (req, res) => {
        const newJobsData = req.body;
        const result = await newJobsCollection.insertOne(newJobsData);
        
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hey, Server Running perfectly.");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
