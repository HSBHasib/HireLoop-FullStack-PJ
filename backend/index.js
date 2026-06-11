const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const companyCollection = db.collection("company");
    const userCollection = db.collection("user");
    const jobApplicationCollection = db.collection("jobApplication");


    // Get All User Data
    app.get("/api/user", async (req, res) => {
      const user = await userCollection.find();
      const result = await user.toArray();

      res.send(result);
    })

    // Get All Jobs Data
    app.get("/api/jobs", async (req, res) => {
        const cursor = await newJobsCollection.find();
        const result = await cursor.toArray();

        res.send(result);
    })

    // Get Indivisual Jobs Data
    app.get("/api/jobs/:id", async (req, res) => {

        const {id} = req.params;
        const query = {
          _id: new ObjectId(id)
        }
        const result = await newJobsCollection.findOne(query);
        res.send(result);
    })
    
    // Get Job Data based on Company
    app.get("/api/my-company-jobs", async (req, res) => {
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
        const job = req.body;

        const newJobsData = {
          ...job,
          createdAt: new Date()
        }

        const result = await newJobsCollection.insertOne(newJobsData);
        res.send(result);
    })

    // Get Company Data
    app.get("/api/my/companies", async (req, res) => {
        const query = req.query;

        // For Recruiter Base Data
        if(req.query.recruiterId) {
            query.recruiterId = req.query.recruiterId;
        }

        const result = await companyCollection.findOne(query);

        if (!result) {
            return res.status(404).json({ success: false, message: "Company not found", data: null });
        }
        res.send(result);
    })

    // Inset Company Data on MongoDB
    app.post("/api/companies", async (req, res) => {
        const company = req.body;

        const companyData = {
          ...company,
          createdAt: new Date()
        }

        const result = await companyCollection.insertOne(companyData);
        res.send(result);
    })

    // Inset Job Application Data on MongoDB
    app.post("/api/job-applications", async (req, res) => {
        const application = req.body;
        
        const applicationData = {
          ...application,
          createdAt: new Date()
        }

        const result = await jobApplicationCollection.insertOne(applicationData);
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
