'use strict';

import express, { Application, Router } from 'express';
import index_route, {
	register_route,
	registerPost_route,
	login_route,
	loginPost_route,
	loginPopup_route,
	dataView_route,
	logout_route,
	about_route,
	startLogger_route
} from './routes/routes.js';

const app: Application = express();
const router: Router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routes: Router[] = [
	index_route,
	register_route,
	registerPost_route,
	login_route,
	loginPost_route,
	loginPopup_route,
	dataView_route,
	logout_route,
	about_route,
	startLogger_route
];

const thisRoute: express.Router = router;
for (const route of routes) {
	thisRoute.use(`/`, route);
}
export default router;
