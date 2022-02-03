import data from './book.json'
import { strict as assert } from 'assert'

var MONGO1 = 'mongodb+srv://godiclee:292118tik@cluster0.mjnag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var MONGO2 = 'mongodb+srv://godiclee:292118tik@cluster0.j5ecw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


import mongoose from 'mongoose';
/* 需要上傳的話請在下方字串裏插入MONGO_URL */
mongoose.connect(MONGO2, {useNewUrlParser: true, useUnifiedTopology: true,}).then((res) => console.log("mongo db connection created"));
console.log(data.length)
import card from '../backend/models/card.js';

try {
	card.insertMany(data)
} catch (e) {
	console.log(e)
}

console.log('done');

