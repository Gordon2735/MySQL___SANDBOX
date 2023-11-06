'use strict';

import express, {
	Application,
	Request,
	Response,
	NextFunction,
	Router
} from 'express';
import { create, ExpressHandlebars } from 'express-handlebars';
import session from 'express-session';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import router from './controllers/router.js';
import helper from '../public/views/helpers/helpers.js';
import favicon from 'express-favicon';
// import loggedEventControl from './controllers/routes/route_handlers/logger_handlers.js';
import ErrorHandler from './errors/error_handler.js';

export default function (config: { applicationName: any }) {
	const app: Application = express();

	const __filename: string = fileURLToPath(import.meta.url);
	const __dirname: string = path.dirname(__filename);
	const errors: ErrorHandler = new ErrorHandler(404, 'Not Found');
	const routers: Router = router;

	const handlebars: ExpressHandlebars = create({
		extname: '.hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(
			__dirname,
			'..',
			'..',
			'public',
			'/views/layouts'
		),
		partialsDir: path.join(
			__dirname,
			'..',
			'..',
			'public',
			'/views/partials'
		),
		helpers: { ...helper }
	});

	app.engine('.hbs', handlebars.engine);
	app.set('view engine', '.hbs');
	app.set('views', path.join(__dirname, '..', '..', 'public', '/views'));
	app.set('trust proxy', 1); // trust first proxy
	app.enable('view cache');

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use(cors());
	app.use(
		favicon(
			path.join(__dirname, '..', '..', 'public', '/images/tw_logo.svg')
		)
	);
	app.use(
		session({
			secret: 'secret-key',
			resave: false,
			saveUninitialized: true
		})
	);
	app.use(express.static('public'));
	app.use(express.static('src'));
	app.use(express.static('dist'));
	app.use('/', routers);

	app.get('/favicon.ico', (_req: Request, res: Response) => {
		res.status(204);
	});

	// app.use('/start_logger', async (req: Request, _res: Response) => {
	// 	console.info(`req.url: ${req.url}`);
	// 	console.info('Start Logger Event has been Logged!');
	// 	// This Function controls the logged event triggered || emitted by the logger.
	// 	loggedEventControl(req, _res);
	// });

	app.use(async (_req: Request, res: Response, next: NextFunction) => {
		// To show the Application Name on the page.
		res.locals.applicationName = await config.applicationName;
		return next();
	});

	// catch 404 and forward to error handler
	app.use((req: Request, _res: Response, next: NextFunction) => {
		const error: Error = new Error(`Not Found (${req.url})`);
		errors.message = error.message;
		next(error);
	});

	// error handler
	// app.use(
	// 	(
	// 		error: unknown,
	// 		req: Request,
	// 		res: Response,
	// 		next: NextFunction,
	// 		errorStatus: number = 500
	// 	) => {
	// 		// set locals, only providing error in development
	// 		res.locals.error =
	// 			req.app.get('env') === 'development' ? error : {};

	// 		// errorStatus = errors.status;
	// 		res.status(errorStatus || 500);
	// 		res.render('error');
	// 		next();
	// 	}
	// );

	// set Global Variables
	app.use(function (_req: Request, res: Response, next: NextFunction) {
		if (res.locals.partials) res.locals.partials = {};
		next();
		if (res.locals.helpers) res.locals.helpers = {};
		next();
		if (res.locals.rows) res.locals.rows = {};
		next();
		if (!res.locals.partials || !res.locals.helpers || !res.locals.rows) {
			if (res.locals) res.locals = {};
			next();
		} else {
			console.error(`res.locals is not set!`);
			next();
		}
	});

	return app;
}

export { express, Application, Request, Response, NextFunction };
