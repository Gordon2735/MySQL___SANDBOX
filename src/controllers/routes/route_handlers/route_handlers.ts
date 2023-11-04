'use strict';

import { Request, Response } from 'express';
import getConfig from '../../../../config/config.js';
import {
	insertUser,
	findUserByUsername
} from '../../../models/Schemas/userModel.js';
import bcrypt from 'bcryptjs';
import { connection } from '../../../models/databases/mysqlDB.js';
import { Connection } from 'mysql2/promise';
import createLoginConfirmationPopup from '../../../utility/appFunction_utilities/login_popup.js';

const config = await getConfig();

declare module 'express-session' {
	interface Session {
		data: SessionData;
	}
}

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

async function registerHandler(req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('register', {
			title: 'Register',
			layout: 'register_main',
			partials: 'partials',
			helpers: 'helpers'
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
		const { username, email, password, password2 } = req.body;
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

async function loginHandler(_req: Request, res: Response): Promise<void> {
	try {
		const login_index = `<script type="module" src="/src/ts/login_index.js" content="text/javascript"></script>`;
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('login', {
			title: 'Login',
			layout: 'login_main',
			partials: 'partials',
			helpers: 'helpers',
			script: [login_index]
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

		createLoginConfirmationPopup();

		const user: any = await findUserByUsername(username);

		if (!user) {
			res.status(400).send({ message: 'Invalid Credentials!' });

			return Promise.reject() as Promise<void>;
		}

		const isMatch: boolean = await bcrypt.compare(password, user.password);
		console.info(`isMatch: ${isMatch}`);

		if (isMatch) {
			res.status(200).send({ message: 'Login Successful!' });

			req.session!.data = user;
			setTimeout(() => {
				res.redirect('/login/data_view');
				console.info(`LoginPostHandler fired and user was: ${user} || 
				${username} || ${user.password} || 
				the redirect should have us at /data_view
			`);
			}, 2000);
			console.info(`user: ${user}`);
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

async function dataViewHandler(req: Request, res: Response): Promise<void> {
	try {
		const conn: Connection = await connection();
		const query = `SELECT * FROM users`;
		const { id, username, email }: any = await conn.query(query);
		console.log(id, username, email);

		const data_view_script = `<script type="module" src="/src/ts/data_view.js" content="text/javascript"></script>`;

		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('data_view', {
			title: 'Data View',
			layout: 'data_view_main',
			partials: 'partials',
			helpers: 'helpers',
			script: [data_view_script],
			user: req.session!.data,
			parts: req.body,
			rows: [id, username, email]
		});

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
	loginPostHandler,
	loginHandler,
	aboutHandler,
	dataViewHandler
};
