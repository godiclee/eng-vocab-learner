import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CardSchema = new Schema({
	word: String,
	chi: String,
	eng: String,
	pos: String,
	chi_sen: String,
	eng_sen: String,
	level: Number,
	hole: Number,
	reported: Boolean,
})

const Card = mongoose.model('Card', CardSchema);

export default Card;