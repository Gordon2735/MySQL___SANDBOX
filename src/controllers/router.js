'use strict';

import express from 'express';
import index_route, { about_route } from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routePath = path.join(__dirname, '..', '..', '..', '/public/views');

console.info(`routePath:  ${routePath}`);

const routes = [index_route];

const thisRoute = router;
for (const route of routes) {
	thisRoute.use(`${routePath}`, route);
	// thisRoute = thisRoute.use(route);
}
export default router;
