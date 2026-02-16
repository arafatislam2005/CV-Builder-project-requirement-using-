const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware - Crucial for frontend communication
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vja3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        // Database and Collections (Naming consistent with Bistro-Boss style)
        const db = client.db("cvBuilderDB");
        const usersCollection = db.collection("users");
        const cvsCollection = db.collection("cvs");
        const applicationsCollection = db.collection("applications");

        console.log("✅ Successfully connected to MongoDB Atlas!");

        // --- USERS API ---
        app.post('/api/users/sync', async (req, res) => {
            const user = req.body;
            const query = { firebaseUID: user.firebaseUID };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);
        });

        // --- CVS API ---
        // GET all CVs for a user
        app.get('/api/cvs', async (req, res) => {
            const email = req.query.email;
            const query = email ? { "personalInfo.email": email } : {};
            const result = await cvsCollection.find(query).toArray();
            res.send(result);
        });

        // GET single CV by ID (THIS FIXES THE "CV NOT FOUND" ERROR)
        app.get('/api/cvs/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const query = { _id: new ObjectId(id) };
                const result = await cvsCollection.findOne(query);
                if (!result) {
                    return res.status(404).send({ message: "CV not found" });
                }
                res.send(result);
            } catch (error) {
                res.status(400).send({ message: "Invalid CV ID format" });
            }
        });

        app.post('/api/cvs', async (req, res) => {
            const result = await cvsCollection.insertOne(req.body);
            res.send(result);
        });

        // --- APPLICATIONS API ---
        app.get('/api/applications', async (req, res) => {
            const result = await applicationsCollection.find().toArray();
            res.send(result);
        });

        app.post('/api/applications', async (req, res) => {
            const result = await applicationsCollection.insertOne(req.body);
            res.send(result);
        });

        // Ping to confirm connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. Database structure is live!");

    } finally {
        // Keep connection open
    }
}
