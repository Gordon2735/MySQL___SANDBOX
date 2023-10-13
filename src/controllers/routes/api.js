'use strict';

import express from 'express';

const router = express.Router();

router.get('/views', (req, res) => {
	res.json({
		message: 'Welcome to the API!'
	});
});

export default router;
