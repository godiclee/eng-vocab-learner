import express from 'express'

const router = express.Router()

router.get("/new-card", (req, res) => {
	res.json({card: "love you"});
});
  
router.post("/add-card", (req, res) => {
	console.log(req.body.word);
});

export default router
  