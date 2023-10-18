'use strict';

import express from 'express';
import index_route, {
	about_route,
	startLogger_route
} from './routes/routes.js';

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routes = [index_route, about_route, startLogger_route];

const thisRoute = router;
for (const route of routes) {
	thisRoute.use(`/`, route);
}
export default router;
