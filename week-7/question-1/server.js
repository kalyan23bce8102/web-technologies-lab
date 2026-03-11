const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function start(){
    await client.connect();
    db = client.db("student_notes");
    console.log("MongoDB Connected");
}

start();


// ADD NOTE
app.post("/notes", async (req,res)=>{
    const note = req.body;
    note.created_date = new Date();
    await db.collection("notes").insertOne(note);
    res.send("Note Added");
});


// VIEW NOTES
app.get("/notes", async (req,res)=>{
    const notes = await db.collection("notes").find().toArray();
    res.json(notes);
});


// UPDATE NOTE
app.put("/notes/:id", async (req,res)=>{
    const id = req.params.id;

    await db.collection("notes").updateOne(
        {_id:new ObjectId(id)},
        {$set:req.body}
    );

    res.send("Note Updated");
});


// DELETE NOTE
app.delete("/notes/:id", async (req,res)=>{
    const id = req.params.id;

    await db.collection("notes").deleteOne(
        {_id:new ObjectId(id)}
    );

    res.send("Note Deleted");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});