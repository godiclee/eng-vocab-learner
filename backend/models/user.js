import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User_Card_Schema = new Schema({
	card: Schema.Types.ObjectId,
	time: Number,
	score: Number,
	freq: Number,
});

const UserSchema = new Schema({
	name: String,
	
	/* statistics */
	skilled: Number,
	not_learned: Number,
	learned_but_not_skilled: Number,
	
	/* settings */
	only_new: Boolean,
	only_old: Boolean,
	freq_of_new: Number,
	finish_hardness: Number,
	
	/* cards */
	new: [Schema.Types.ObjectId],
	skilled: [Schema.Types.ObjectId],
	black: [Schema.Types.ObjectId],
	learned: [User_Card_Schema],
})

const User = mongoose.model('User', UserSchema);

export default User;