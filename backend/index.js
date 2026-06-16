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

    // Connect to DB
    const db = client.db("hireloopDB");

    // Access to db collections
    const userCollection = db.collection("user");
    const sessionCollection = db.collection("session");
    const newJobsCollection = db.collection("newJobs");
    const companyCollection = db.collection("company");
    const jobApplicationCollection = db.collection("jobApplication");
    const seekerPlansCollection = db.collection("seekerPlans");
    const subcriptionCollection = db.collection("subcriptions");

    // ====================  Varifications  ====================
    const verifyToken = async (req, res, next) => {
      const authHeader = req.headers?.authorization;

      if (!authHeader) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      // Access the token
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const query = { token: token };
      const session = await sessionCollection.findOne(query);
      if (!session) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const userId = session.userId;

      const userQuery = {
        _id: userId,
      };

      const user = await userCollection.findOne(userQuery);
      if (!user) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      // Set data in the req object
      req.user = user;
      next();
    };

    // For Admin
    const verifyAdmin = async (req, res, next) => {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "forbidden access" });
      }
      next();
    };

    // For Seeker
    const verifySeeker = async (req, res, next) => {
      if (req.user?.role !== "seeker") {
        return res.status(403).json({ message: "forbidden access" });
      }
      next();
    };

    // For Recruiter
    const verifyRecruiter = async (req, res, next) => {
      if (req.user?.role !== "recruiter") {
        return res.status(403).json({ message: "forbidden access" });
      }
      next();
    };

    // ==================== Users ====================
    // Get All User Data
    app.get("/api/user", async (req, res) => {
      const user = await userCollection.find();
      const result = await user.toArray();

      res.send(result);
    });

    // ==================== Jobs ====================
    // Get All Jobs Data
    app.get("/api/jobs", async (req, res) => {
      const query = {};

      // Job Filter -
      // based on seaching
      if(req.query.search) {
        query.$or = [
          { title: { $regex: req.query.search, $options: 'i' } },
          { companyName: { $regex: req.query.search, $options: 'i' } }
        ]
      }

      // based on JOB Location
      if (req.query.location) {
        const searchLocation = req.query.location.trim();

        if (searchLocation.toLowerCase() === "international") {
          query.location = { $regex: '^((?!bangladesh|remote).)*$', $options: "i" };
        } else {
          query.location = { $regex: searchLocation, $options: "i" };
        }
      }

      // based on JOB Type
      if (req.query.type) {
        query.type = req.query.type;
      }

      // based on JOB Category
      if (req.query.category) {
        query.category = req.query.category;
      }

      // Pagination
      if(req.query.page) {
        const page = req.query.page;
        const perPage = 3;
        const skipItem = (page - 1)*perPage;

        const total = await newJobsCollection.countDocuments(query);
        const cursor = await newJobsCollection.find(query).skip(skipItem).limit(perPage);
        const jobs = await cursor.toArray();
        // return res.send(jobs);
        return res.send({total, jobs});
      }

      const cursor = await newJobsCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });

    // Get Indivisual Jobs Data
    app.get("/api/jobs/:id", async (req, res) => {
      const { id } = req.params;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await newJobsCollection.findOne(query);
      res.send(result);
    });

    // Get Job Data based on Company
    app.get("/api/my-company-jobs", verifyToken, async (req, res) => {
      const query = req.query;

      if (req.query.companyId) {
        query.companyId = req.query.companyId;
      }

      const cursor = await newJobsCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });

    // Inset New Jobs Data on MongoDB
    app.post("/api/jobs", verifyToken, async (req, res) => {
      const job = req.body;

      const newJobsData = {
        ...job,
        createdAt: new Date(),
      };

      const result = await newJobsCollection.insertOne(newJobsData);
      res.send(result);
    });

    // ==================== Companies ====================
    // Get All Companies Data
    app.get("/api/companies", async (req, res) => {
      const cursor = await companyCollection.find();
      const result = await cursor.toArray();

      res.send(result);
    });

    // Get Indivisual Company Data
    app.get("/api/my/companies", async (req, res) => {
      const query = req.query;

      // For Recruiter Base Data
      if (req.query.recruiterId) {
        query.recruiterId = req.query.recruiterId;
      }

      const result = await companyCollection.findOne(query);

      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "Company not found", data: null });
      }
      res.send(result);
    });

    // Inset Company Data on MongoDB
    app.post("/api/companies", verifyToken, async (req, res) => {
      const company = req.body;

      const companyData = {
        ...company,
        createdAt: new Date(),
      };

      const result = await companyCollection.insertOne(companyData);
      res.send(result);
    });

    // Updated Comapny Data
    app.patch(
      "/api/company/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const updatedCompany = req.body;

        // Select the id
        const filter = { _id: new ObjectId(id) };

        // updated
        const updatedDocument = {
          $set: {
            status: updatedCompany.status,
          },
        };

        const result = await companyCollection.updateOne(
          filter,
          updatedDocument,
        );
        res.send(result);
      },
    );

    // ==================== Job Applications ====================
    // Get Job Application Data on MongoDB
    app.get(
      "/api/job-applications",
      verifyToken,
      verifySeeker,
      async (req, res) => {
        const query = {};

        if (req.query.applicantId) {
          query.applicantId = req.query.applicantId;

          // Check is that right user or not
          if (req.user._id.toString() !== req.query.applicantId) {
            return res.status(403).send({ message: "forbidden access" });
          }
        }

        if (req.query.jobId) {
          query.jobId = req.query.jobId;
        }

        const cursor = await jobApplicationCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      },
    );

    // Inset Job Application Data on MongoDB verifyToken, verifySeeker,
    app.post("/api/job-applications", async (req, res) => {
      const application = req.body;

      const applicationData = {
        ...application,
        createdAt: new Date(),
      };

      const result = await jobApplicationCollection.insertOne(applicationData);
      res.send(result);
    });

    // ==================== Plans ====================
    // Get Seeker Plans Data from MongoDB
    app.get("/api/seeker-plans", async (req, res) => {
      const query = {};

      if (req.query.plan_id) {
        query.plan_id = req.query.plan_id;
      }

      const result = await seekerPlansCollection.findOne(query);
      res.send(result || []);
    });

    // ==================== Subcriptions ====================
    // Insert Subcription Data on MongoDB and update user 'Plan' data
    app.post("/api/subcriptions", verifyToken, async (req, res) => {
      const subcription = req.body;

      // Subcription Data
      const subcriptionData = {
        ...subcription,
        createdAt: new Date(),
      };
      const subcriptionResult =
        await subcriptionCollection.insertOne(subcriptionData);

      // Update job Seeker User Data
      const filter = { email: subcription.customerAccountEmail };
      const updateDocument = {
        $set: {
          plan: subcription.planId,
        },
      };

      const updatedResult = await userCollection.updateOne(
        filter,
        updateDocument,
      );

      const subcriptionDataAndUpdatedUserData = {
        subcriptionResult,
        updatedResult,
      };

      res.send(subcriptionDataAndUpdatedUserData);
    });

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
