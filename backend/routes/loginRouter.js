import express from 'express'
import Card from '../models/card.js'
import { User,  Daily_Stats } from '../models/user.js'

import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

const router = express.Router()

router.get('/check-user-exist', async (req, res) => {
	const existing = await User.findOne({'username' : req.query.username});
	res.json({exist: existing});
});

router.post('/create-user', async (req, res) => {
	const password = req.body.password;
	const password_hash = bcrypt.hashSync(password, salt);
	const allCardId = await Card.find().distinct('_id');

	const newUser = User({
		'username' : req.body.username,
		'password_hash' : password_hash,
		
		/* statistics */
		'skilled' : 0,
		'not_learned' : allCardId.length,
		'learned_but_not_skilled' : 0,
		'last_login' : Date(),
	
		/* settings */
		'level' : req.body.level,
		'only_new' : false,
		'only_old' : false,
		'multiple_hole' : true,
		'freq_of_new' : 0,
		'finish_hardness' : 0,
		
		/* cards */
		'not_learned_cards' : allCardId,
		'skilled_cards' : [],
		'black_cards' : [],
		'learned_but_not_skilled_cards' : [],
	});
	await newUser.save();
	res.json({ success : true });
});

router.post('/login', async (req, res) => {
	const user = await User.findOne({'username' : req.body.username});
	const success = bcrypt.compareSync(req.body.password, user.password_hash);
	const last_login = user.last_login;
	user.last_login = Date();
	await User.updateOne({'username' : req.body.username}, {'last_login' : Date() });
	res.json({ success: success, user: user, last_login: last_login });
});

export default router;
  
