import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User_Card_Schema = new Schema({
	card: Schema.Types.ObjectId,
	time: Number,
	score: Number,
	freq: Number,
	priority: Number,
});

const UserSchema = new Schema({
	username: String,
	password_hash: String,
	
	/* statistics */
	skilled: Number,
	not_learned: Number,
	learned_but_not_skilled: Number,
	last_login: Date,
	avg_priority: Number,
	
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
	learned_but_not_skilled_cards: [User_Card_Schema],
})

const User = mongoose.model('User', UserSchema);

export default User;
