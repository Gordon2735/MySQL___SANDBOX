'use strict';

import express from 'express';
import indexHandler, { aboutHandler } from './route_handlers/index_handler.js';

const router = express.Router();

const index_route = router.get('/', indexHandler);
const about_route = router.get('/', aboutHandler);

export { index_route as default, about_route };
