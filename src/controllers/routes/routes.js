'use strict';

import router from './api.js';

const index_route = router.get('/index.html', (_req, res) => {
	res.set('Content-Type', 'text/html');

	res.render('index.html');
});

export default index_route;
