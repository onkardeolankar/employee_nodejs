import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();


const app = express();
// const PORT = 4000;
const PORT = process.env.PORT;


app.use(express.json());
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
// app.use(cors);
const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb+srv://Onkar:F5Z6B0KarUxuqzhJ@cluster0.roxwh.mongodb.net";
async function createConnection() {
  const client = await new MongoClient(MONGO_URL);
  client.connect();
  console.log("Mongo is Connected😁 😊");
  return client;
}
const client = await createConnection();

app.get("/", function (req, res) {
    res.send("Welcome to our Employee System");
  });

app.get("/employees",async function (req, res) {
    const employees = await client
    .db("b32we")
    .collection("employees")
    .find({})
    .toArray();
    res.send(employees);

});

app.put("/employees/:id", async function (req, res) {
    const { id } = req.params;
    const bigd= req.body;
    const nanu = await client
    .db("b32we")
    .collection("employees")
    .updateOne({ id: id }, { $set: bigd });
    res.send(nanu);

});

app.get("/employees/:id", async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);

  const employee = await client
    .db("b32we")
    .collection("employees")
    .findOne({ id: id });
    employee ? res.send(employee) : res.send({ Msg: "Movie not found" });
});

app.post("/employees", express.json(), async function (req, res) {
  const data = req.body;
  console.log(data);

  const result = await client
    .db("b32we")
    .collection("employees")
    .insertMany(data);
  res.send(result);
});
app.listen(PORT, () => console.log(`App Started in ${PORT}`));

