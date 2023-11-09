'use strict';

import { Request, Response, NextFunction } from '../../../app.js';
import express from 'express';
import getConfig from '../../../../config/config.js';
import {
	insertUser,
	findUserByUsername
} from '../../../models/Schemas/userModel.js';
import bcrypt from 'bcryptjs';
import { connection } from '../../../models/databases/mysqlDB.js';
import { Connection } from 'mysql2/promise';
import getRowsPacketUsers from '../../../models/Schemas/userModel.js';
const config = await getConfig();

declare module 'express-session' {
	interface Session {
		data: SessionData;
	}
}

const app: express.Application = express();
const request: Request = {} as Request;
const response: Response = {} as Response;
const nextFunction: NextFunction = {} as NextFunction;

async function indexHandler(_req: Request, res: Response): Promise<void> {
	const index_script = `<script type="module" src="/src/ts/index.js" content="text/javascript"></script>`;
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('index', {
			title: `MySQL Sandbox`,
			layout: 'main',
			helpers: 'helpers',
			partials: 'footer_partial',
			script: [index_script],
			appName: config.applicationName
		});
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`indexHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');

		return Promise.reject() as Promise<void>;
	}
}

async function registerHandler(_req: Request, res: Response): Promise<void> {
	try {
		const register_index = `<script type="module" src="/src/ts/register.js" content="text/javascript"></script>`;
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('register', {
			title: 'Register New User',
			layout: 'register_main',
			partials: 'partials',
			helpers: 'helpers',
			script: [register_index]
		});
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`registerHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');

		return Promise.reject() as Promise<void>;
	}
}

async function registerPostHandler(req: Request, res: Response): Promise<void> {
	try {
		const errors: any = [];
		const { username, email, password, password2 }: any = req.body;
		await insertUser(username, email, password);

		if (username && email && password) {
			console.log(
				`${username}:  Thank You for registering! Please login`
			);
			res.redirect('/login');
		} else if (!username || !email || !password || !password2) {
			errors.push({ msg: 'Please fill in all fields' });
		} else if (password !== password2) {
			errors.push({ msg: 'Passwords do not match' });
		} else if (password.length < 8) {
			errors.push({ msg: 'Password must be at least 8 characters' });
		} else if (errors.length > 0) {
			res.render('register', {
				errors
			});
		} else {
			res.send('pass');
		}
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`registerPostHandler had an ERROR: ${error}`);
		res.status(500).send(`Post Register Error: ${error}`);

		return Promise.reject() as Promise<void>;
	}
}

async function loginHandler(req: Request, res: Response): Promise<void> {
	try {
		// const login_index = `<script type="module" src="/src/ts/login_index.js" content="text/javascript"></script>`;
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('login', {
			title: 'User Login',
			layout: 'login_main',
			partials: 'partials',
			helpers: 'helpers',
			// script: [login_index],
			username: req.body.username,
			email: req.body.email
		});

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`loginHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');

		return Promise.reject() as Promise<void>;
	}
}

async function loginPostHandler(req: Request, res: Response): Promise<void> {
	try {
		const { username, password }: any = req.body;
		const user: any = await findUserByUsername(username);

		if (!user) {
			res.status(400).send({ message: 'Invalid Credentials!' });

			return Promise.reject() as Promise<void>;
		}

		const isMatch: boolean = await bcrypt.compare(password, user.password);
		console.info(`isMatch: ${isMatch}`);

		if (isMatch === true) {
			res.redirect('/data_view');
			// app.get('/login', async (req: Request, res: Response) => {
			// 	const documents: Document = req.body.document;
			// 	showSuccess(response, documents);
			// 	console.info(`user: ${user}`);
			// 	res.send(documents);
			// });

			return Promise.resolve() as Promise<void>;
		} else {
			res.status(400).send({ message: 'Invalid Credentials!' });

			return Promise.reject() as Promise<void>;
		}
	} catch (error: unknown) {
		console.error(
			`loginPostHandler had an ERROR: ${(error as Error).message}`
		);
		res.status(500).send(`Post Login Error: ${(error as Error).message}`);
		return Promise.reject() as Promise<void>;
	}
}

async function loginPopupHandler(
	req: Request,
	res: Response,
	_next: NextFunction
): Promise<void> {
	try {
		const login_popup_utility = `<script type="module" src="/src/utility/appFunction_utilities/login_popup.js" content="text/javascript"></script>`;
		const login_popup_index = `<script type="module" src="/src/ts/login_popup_index.js" content="text/javascript"></script>`;
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('login_popup', {
			title: 'Login Popup Confirmation',
			layout: 'login_popup_main',
			partials: 'partials',
			helpers: 'helpers',
			script: [login_popup_index],
			script_utility: [login_popup_utility],
			username: req.body.username,
			email: req.body.email
		});

		let document: Document;
		let loginFormButton: HTMLButtonElement | null;

		app.get(
			'/login_popup',
			(req: Request, res: Response, _next: NextFunction) => {
				document = req.body.document;
				res.send(document);
				loginFormButton = document.getElementById(
					'loginFormButton'
				) as HTMLButtonElement;
				res.send(loginFormButton);
				// return createLoginConfirmationPopup(document);
			}
		);

		let popup_event: MouseEvent = null as unknown as MouseEvent;
		return Promise.resolve()
			.then(() => {
				loginFormButton?.addEventListener(
					'click',
					async (event): Promise<MouseEvent> => {
						console.info(
							`loginFormButton Event fired and now should Redirect to /data_view`
						);
						event.preventDefault();
						popup_event = event;
						return popup_event;
					}
				);
				// next();
			})
			.then(() => {
				if (popup_event) {
					console.info(
						`
							%c
							popup_event: ${popup_event} || Now will attempt to Redirect to /data_view
						`,
						`
							color: chartreuse;
							font-family: 'Titillium Web', sans-serif; 
							font-size: 0.85rem;
							font-weight: bold;
							background-color: black;						
						`
					);
					return res.redirect('/data_view');
				}
			})
			.catch((error: unknown) => {
				console.error(
					`loginFormButton EventListener within the Route Handler: LoginPopupHandler | Type of ERROR: ${error}`
				);
				res.status(500).send(
					`loginFormButton EventListener Error: ${error}`
				);
				return Promise.reject() as Promise<void>;
			}) as Promise<void>;
	} catch (error: unknown) {
		console.error(`loginPopupHandler had an ERROR: ${error}`);
		res.status(500).send(
			`Server Error occurred in the Route Handler called loginPopupHandler | Type of ERROR: ${error}`
		);
		return Promise.reject() as Promise<void>;
	}
}

async function dataViewHandler(_req: Request, res: Response): Promise<void> {
	try {
		const conn: Connection = await connection();
		const query = `SELECT * FROM users`;
		const users: any = await conn.query(query);
		console.info(`users username: ${users[0][4].username}`);

		const data_view_script = `<script type="module" src="/src/ts/data_view.js" content="text/javascript"></script>`;

		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('data_view', {
			title: 'MySQL Data View',
			layout: 'data_view_main',
			partials: 'partials',
			helpers: 'helpers',
			script: [data_view_script],
			users: users[0]
		});

		await conn.end();
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`dataViewHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');

		return Promise.reject() as Promise<void>;
	}
}

async function aboutHandler(_req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('about', {
			title: 'About',
			layout: 'main',
			partials: 'partials',
			helpers: 'helpers'
		});
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`aboutHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');

		return Promise.reject() as Promise<void>;
	}
}
export {
	indexHandler as default,
	registerHandler,
	registerPostHandler,
	loginHandler,
	loginPostHandler,
	loginPopupHandler,
	dataViewHandler,
	aboutHandler
};
