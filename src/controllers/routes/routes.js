'use strict';

import express from 'express';
import indexHandler, { aboutHandler } from './route_handlers/route_handlers.js';
import startLogger_handler from './route_handlers/logger_handlers.js';

const router = express.Router();

const index_route = router.get('/', indexHandler);
const about_route = router.get('/about', aboutHandler);
const startLogger_route = router.get('/start_logger', startLogger_handler);

export { index_route as default, about_route, startLogger_route };
