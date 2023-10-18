'use strict';

import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import router from './controllers/router.js';
import helper from '../public/views/helpers/helpers.js';
import favicon from 'serve-favicon';
import loggedEventControl from './controllers/routes/route_handlers/logger_handlers.js';

export default function (config) {
	const app = express();

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const handlebars = create({
		extname: '.hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, '..', 'public', '/views/layouts'),
		partialsDir: path.join(__dirname, '..', 'public', '/views/partials'),
		helpers: { ...helper }
	});

	app.engine('.hbs', handlebars.engine);
	app.set('view engine', '.hbs');
	app.set('views', path.join(__dirname, '..', 'public', '/views'));
	app.set('trust proxy', 1); // trust first proxy
	app.enable('view cache');

	app.use(express.static(path.join(__dirname, '..', 'public', '/views')));
	console.info(`__dirname:  ${__dirname}`);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use(cors());
	app.use(
		favicon(path.join(__dirname, '..', 'public', '/images/tw_logo.ico'))
	);

	app.use(express.static('public'));
	app.use(express.static('src'));
	app.use(`/`, router);

	app.get('/favicon.ico', (_req, res) => {
		res.status(204);
	});

	app.use(async (req, res, next) => {
		// To show the Application Name on the page.
		res.locals.applicationName = await config.applicationName;
		return next();
	});

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

	// set Global Variables
	app.use(function (_req, res, next) {
		if (res.locals.partials) res.locals.partials = {};
		next();
	});
	// This Function controls the logged event triggered || emitted by the logger.
	loggedEventControl();

	return app;
}
