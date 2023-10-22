'use strict';

import express, { Router } from 'express';
import indexHandler, { aboutHandler } from './route_handlers/route_handlers.js';
import startLogger_handler from './route_handlers/logger_handlers.js';

const router: Router = express.Router();

const index_route: express.Router = router.get('/', indexHandler);
const about_route: express.Router = router.get('/about', aboutHandler);
const startLogger_route: express.Router = router.get(
	'/start_logger',
	startLogger_handler
);

export { index_route as default, about_route, startLogger_route };
