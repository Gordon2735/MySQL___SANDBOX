'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './controllers/routes/api.js';

export default function app(config) {
	const app = express();

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	app.set('views', path.join(__dirname, 'views'));

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// app.use('view cache');
	app.use(express.static('public'));

	app.set('trust proxy', 1); // trust first proxy

	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, './css/index.css')));

	app.get('/favicon.ico', (_req, res) => {
		res.status(204);
	});
	app.get('/', (_req, res) => {
		res.send(path.join(__dirname, './public/images/tw_logo.ico'));
	});

	app.use(async (req, res, next) => {
		// To show the Application Name on the page.
		res.locals.applicationName = await config.applicationName;
		return next();
	});

	app.use('/', router);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error(`Not Found (${req.url})`);
		err.status = 404;
		next(err);
	});

	// error handler
	app.use((err, req, res) => {
		// set locals, only providing error in development
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});

	return app;
}
