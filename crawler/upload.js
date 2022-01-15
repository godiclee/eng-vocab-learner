import data from './level6.json'
import { strict as assert } from 'assert'


import mongoose from 'mongoose';
# 需要上傳的話請在下方字串裏插入MONGO_URL
mongoose.connect("INSERT_YOUR_OWN_MONGO_URL", {useNewUrlParser: true, useUnifiedTopology: true,}).then((res) => console.log("mongo db connection created"));
console.log(data.length)
import card from '../backend/models/card.js';

try {
	card.insertMany(data)
} catch (e) {
	console.log(e)
}

console.log('done');

