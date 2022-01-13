import express from 'express'
import Card from '../models/card.js'
import { User, User_Card, Daily_Stats } from '../models/user.js'

const router = express.Router()

router.get('/get-card', async (req, res) => {
	const user = await User.findOne({'username' : req.query.username});
	let date = new Date();
	date.setHours(0, 0, 0, 0);
	let daily_stats = await Daily_Stats.findOne({ 'userId' : user._id, 'date' : date });
	if (!daily_stats) {
		daily_stats = new Daily_Stats({
			userId: user._id,
			date: date,
			old: 0,
			new: 0,
			add_old: 0,
			skilled: 0,
			correct: 0,
			incorrect: 0
		});
	}

	const new_prob = Math.max(25, 100 - daily_stats.add_old) / (100 + user.learned_but_not_skilled);
	console.log(new_prob);
	if (Math.random() < new_prob || user.learned_but_not_skilled === 0) {
		console.log('new card');
		let newCard = await Card.aggregate([
			{ $match: { level: { $eq: user.level },
						_id: { $in: user.not_learned_cards } } },
			{ $sample: { size: 1 } },
		])
		
		if (newCard.length > 0) {
			newCard = newCard[0];
			res.json({
				card: newCard,  
				holes: user.multiple_hole ? newCard.holes : [newCard.hole],
				score: 0,
				newcard: true
			});
			return;
		}
		console.log('no new card :(');
	}

	console.log('old card');
	
	const oldUserCard = await User_Card.aggregate([
		{ $match: { 'userId': user._id } },
		{ $sample: { size: 1 } },
	])
	
	const oldCard = await Card.find({ '_id': oldUserCard[0].cardId });
	
	res.json({ 
		card: oldCard[0],
		holes: user.multiple_hole ? oldCard[0].holes : [oldCard[0].hole],
		score: oldUserCard[0].score,
		newcard: false
	});
	/*
	const oldUserCard = await User.aggregate([
		{ $match: { 'username' : req.query.username }},
		{ $project: { 'learned_but_not_skilled_cards' : 1 } },
		{ $unwind: { path: '$learned_but_not_skilled_cards' } },
		{ $sample: { size: 1 } }
	])
	
			{ $lookup: {
			from: 'User_Card',
			localField: 'learned_but_not_skilled_cards.cardId',
			foreignField: '_id',
			as: 'learned_but_not_skilled_cards.card'
		  }
		},
	
	const newCard = new Card({
		word: 'effect',
		chi: '效果；影響；結果',
		eng: 'the result of a particular influence',
		pos: 'noun',
		chisen: '核輻射外泄給環境帶來了災難性的影響。',
		engsen: 'The radiation leak has had a disastrous effect on/upon the environment.',
		level: 1,
		hole: 7,
		holes: [7, 8],
		reported: false,
	})
	*/
});
  
router.post('/correct', async (req, res) => {
	const card = req.body.card;
	let user = await User.findOne({'username' : req.body.username});
	let date = new Date();
	date.setHours(0, 0, 0, 0);
	let daily_stats = await Daily_Stats.findOne({ 'userId' : user._id, 'date' : date });
	if (!daily_stats) {
		daily_stats = new Daily_Stats({
			userId: user._id,
			date: date,
			old: 0,
			new: 0,
			add_old: 0,
			skilled: 0,
			correct: 0,
			incorrect: 0
		});
	}
		
	if (req.body.newCard) {
		user.skilled += 1;
		user.not_learned -= 1;
		user.skilled_cards.push(card._id);
		user.not_learned_cards = user.not_learned_cards.filter((id) => id != card._id);
		await user.save();

		daily_stats.new += 1;
		daily_stats.skilled += 1;
		daily_stats.correct += 1;
		await daily_stats.save(); 

		res.json({ score: 1000 });
	} else {
		let userCard = await User_Card.findOne({
			'userId' : user._id,
			'cardId' : card._id
		});
		userCard.score += 150 + 200 * Math.exp(-0.3 * (userCard.time - 1));
		userCard.time += 1;

		daily_stats.old += 1;
		daily_stats.correct += 1;

		if (userCard.score >= 1000) {
			user.skilled += 1;
			user.learned_but_not_skilled -= 1;
			/*user.learned_but_not_skilled_cards = user.learned_but_not_skilled_cards.filter(
				(card) => card._id != userCard.cardId
			)*/
			await user.save();
			await User_Card.deleteOne({'_id' : userCard._id});

			daily_stats.skilled += 1;
		} else{
			await daily_stats.save(); 
			await userCard.save();
		}
		res.json({ score: userCard.score });
	}
});

router.post('/incorrect', async (req, res) => {
	let card = req.body.card;
	const user = await User.findOne({'username' : req.body.username});
	let date = new Date();
	date.setHours(0, 0, 0, 0);
	let daily_stats = await Daily_Stats.findOne({ 'userId' : user._id, 'date' : date });
	if (!daily_stats) {
		daily_stats = new Daily_Stats({
			userId: user._id,
			date: date,
			old: 0,
			new: 0,
			add_old: 0,
			skilled: 0,
			correct: 0,
			incorrect: 0
		});
	}

	if (req.body.newCard) {
		user.not_learned -= 1;
		user.learned_but_not_skilled += 1;
		const newUserCard = new User_Card({
			userId: user._id,
			cardId: card._id,
			time: 1,
			score: 250
		});
		await newUserCard.save();
		/*user.learned_but_not_skilled_cards.push(newUserCard);*/
		user.not_learned_cards = user.not_learned_cards.filter((id) => id != card._id);
		await user.save();

		daily_stats.new += 1;
		daily_stats.add_old += 1;
		daily_stats.incorrect += 1;
		await daily_stats.save(); 

		res.json({ score: 250 });
	} else {
		let userCard = await User_Card.findOne({
			'userId' : user._id,
			'cardId' : card._id
		});
		userCard.score = Math.max(0, userCard.score - 250);
		userCard.time += 1;
		await userCard.save();

		daily_stats.old += 1;
		daily_stats.incorrect += 1;
		await daily_stats.save();

		res.json({ score: userCard.score });
	}
});

router.post('/delete-card', async (req, res) => {
	const card = req.body.card;
	const newCard = req.body.newCard
	let user = await User.findOne({'username' : req.body.username});
	if (newCard) {
		user.not_learned -= 1;
		user.not_learned_cards = user.not_learned_cards.filter((id) => id != card._id);
		await user.save();
	} else {
		let userCard = await User_Card.findOne({
			'userId' : user._id,
			'cardId' : card._id
		});
		user.learned_but_not_skilled -= 1;
		await user.save();
		await User_Card.deleteOne({'_id' : userCard._id});
	}
	res.json({ msg: 'success' });
});

export default router;
  