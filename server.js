import express from 'express';
const app = express();

import cors from 'cors'
app.use(cors())

import dotenv from "dotenv-defaults"
dotenv.config();

import bodyParser from 'body-parser'
app.use(bodyParser.json());

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true,}).then((res) => console.log("mongo db connection created"));
""

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
/* "nodemon server.js --ext js --exec babel-node", */
/* "node server.js" */

const port = process.env.PORT || 80;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

app.get("/new-card", (req, res) => {
  res.json({card: "love you"});
});

app.post("/add-card", (req, res) => {
  console.log(req.body.word);
});