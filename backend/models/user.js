import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Daily_Stats_Schema = new Schema({
	userId: Schema.Types.ObjectId,
	date: Date,
	old: Number,
	new: Number,
	add_old: Number,
	skilled: Number,
	correct: Number,
	incorrect: Number	
});
	
const User_Card_Schema = new Schema({
	userId: Schema.Types.ObjectId,
	cardId: Schema.Types.ObjectId,
	time: Number,
	score: Number,
});

const UserSchema = new Schema({
	username: String,
	password_hash: String,
	
	/* statistics */
	skilled: Number,
	not_learned: Number,
	learned_but_not_skilled: Number,
	last_login: Date,
	/*daily_stats: [Daily_Stats_Schema],*/
	
	/* settings */
	level: Number,
	only_new: Boolean,
	only_old: Boolean,
	multiple_hole: Boolean,
	freq_of_new: Number,
	finish_hardness: Number,
	
	/* cards */
	not_learned_cards: [Schema.Types.ObjectId],
	skilled_cards: [Schema.Types.ObjectId],
	black_cards: [Schema.Types.ObjectId],
	/*learned_but_not_skilled_cards: [User_Card_Schema],*/
})

const User = mongoose.model('User', UserSchema);
const User_Card = mongoose.model('User_Card', User_Card_Schema);
const Daily_Stats = mongoose.model('Daily_Stats', Daily_Stats_Schema);

export { User, User_Card, Daily_Stats };
