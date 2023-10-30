'use strict';

import { Request, Response } from 'express';
import getConfig from '../../../../config/config.js';
import {
	insertUser,
	findUserByUsername
} from '../../../models/Schemas/userModel.js';
import bcrypt from 'bcryptjs';
import getRowsPacketUsers from '../../../models/Schemas/userModel.js';
import { executeMysqlQuery } from '../../../bin/server.js';
import { RowDataPacket } from 'mysql2/promise';

const config = await getConfig();

// async function logThisEvent(
// 	request: Request,
// 	response: Response
// ): Promise<void> {
// 	startLogger_handler(request, response);
// 	loggedEventControl();
// }

async function indexHandler(req: Request, res: Response): Promise<void> {
	const index_script = `<script type="module" src="/src/ts/index.js" content="text/javascript"></script>`;
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('index', {
			// ...(await getConfig()),
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
			// ...(await getConfig()),
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

async function loginHandler(req: Request, res: Response): Promise<void> {
	try {
		const login_index = `<script type="module" src="/src/ts/login_index.js" content="text/javascript"></script>`;
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('login', {
			// ...(await getConfig()),
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
		const user: any = await findUserByUsername(username);

		res.redirect('/data_view');

		if (!user) {
			res.status(400).send({ message: 'Invalid Credentials!' });

			return Promise.reject() as Promise<void>;
		}

		const isMatch: boolean = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.status(400).send({ message: 'Invalid Credentials!' });

			return Promise.reject() as Promise<void>;
		}
		const users = await getRowsPacketUsers();
		console.info(`users: ${users}`);

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(
			`loginPostHandler had an ERROR: ${(error as Error).message}`
		);
		res.status(500).send(`Post Login Error: ${(error as Error).message}`);
		return Promise.reject() as Promise<void>;
	}
}

async function aboutHandler(req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('about', {
			// ...(await getConfig()),
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

const data_view_script = `<script type="module" src="/src/ts/data_view.js" content="text/javascript"></script>`;

async function dataViewHandler(req: Request, res: Response): Promise<void> {
	try {
		const { id, username, email, password }: any = req.body;
		const query = `SELECT * FROM users`;
		const [rows]: RowDataPacket[] = await executeMysqlQuery(query, [
			id,
			username,
			email,
			password
		]);

		console.log(rows);

		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('data_view', {
			title: 'Data View',
			layout: 'data_view_main',
			partials: 'partials',
			helpers: 'helpers',
			script: [data_view_script],
			rows: rows
		});
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`dataViewHandler had an ERROR: ${error}`);
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
