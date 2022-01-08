import express from 'express'
import Card from '../models/card.js'
import User from '../models/user.js'

const router = express.Router()

router.get('/get-card', async (req, res) => {
	const user = await User.findOne({'username' : req.query.username});
	
	/*user.not_learned_cards*/

	const prob = Math.floor(Math.random() * 1e20)
	if (prob >= 1) {
		console.log('new card');
		let newCard = await Card.aggregate([
			{ $match: { level: { $gte: user.level },
						_id: { $in: user.not_learned_cards } } },
			{ $sample: { size: 1 } },
		])
		
		/*
		priority = avg_priority + (Math.random() - 0.5) / 10
		avg_priority = avg_priority + priority / user.not_learned_cards.length */
		if (newCard.length > 0) {
			newCard = newCard[0];
			res.json({
				card: newCard,  
				holes: user.multiple_hole ? newCard.holes : [newCard.hole],
				newCard: true
			});
			return;
		}
		console.log('no new card :(');
	}

	console.log('old card');

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
	res.json({card: newCard});
});
  
router.post('/add-card', (req, res) => {
	res.json({qq: "success"});
});

export default router
  