import express from 'express'
import { User } from '../models/user.js'

const router = express.Router()

router.get('/', async (req, res) => {
	const user = await User.findOne({ 'username' : req.query.username });
	res.json({ 
		level: user.level, 
		only_new: user.only_new,
		only_old: user.only_old,
		multiple_hole: user.multiple_hole,
		freq_new: user.freq_of_new,
		finish_hardness: user.finish_hardness
	});
});
  
router.post('/level', async (req, res) => {
	await User.updateOne(
		{ 'username' : req.body.username }, 
		{ 'level' : req.body.level }
	);
	res.json({ msg: 'done' });
});

export default router;


  