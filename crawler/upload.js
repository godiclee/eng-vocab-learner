import data from './level1.json'
import { strict as assert } from 'assert'


import mongoose from 'mongoose';
mongoose.connect("mongodb+srv://godiclee:292118tik@cluster0.mjnag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true,}).then((res) => console.log("mongo db connection created"));
console.log(data.length)
import card from '../backend/models/card.js';

try {
	card.insertMany(data)
} catch (e) {
	console.log(e)
}

console.log('done');

