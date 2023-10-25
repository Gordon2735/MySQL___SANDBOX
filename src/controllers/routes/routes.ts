'use strict';

import express, { Router } from 'express';
import indexHandler, {
	registerHandler,
	registerPostHandler,
	loginHandler,
	loginPostHandler,
	aboutHandler
} from './route_handlers/route_handlers.js';
import startLogger_handler from './route_handlers/logger_handlers.js';

const router: Router = express.Router();

const index_route: express.Router = router.get('/', indexHandler);

const register_route: express.Router = router.get('/register', registerHandler);
const registerPost_route: express.Router = router.post(
	'/register',
	registerPostHandler
);

const login_route: express.Router = router.get('/login', loginHandler);
const loginPost_route: express.Router = router.post('/login', loginPostHandler);

const about_route: express.Router = router.get('/about', aboutHandler);
const startLogger_route: express.Router = router.get(
	'/start_logger',
	startLogger_handler
);

export {
	index_route as default,
	register_route,
	registerPost_route,
	login_route,
	loginPost_route,
	about_route,
	startLogger_route
};
