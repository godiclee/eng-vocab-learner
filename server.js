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

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);