import express from 'express'
import { User, User_Card, Daily_Stats } from '../models/user.js'

const router = express.Router()

router.get('/', async (req, res) => {
	const user = await User.findOne({'username' : req.query.username});
	res.json({ user: user });
});
  
router.post('/level', async (req, res) => {
	let user = await User.findOne({'username' : req.body.username});
	user.level = req.body.level
	user.save();


	res.json({ msg: 'done' });
});

export default router;
  