'use strict';

import { Request, Response } from 'express';
import getConfig from '../../../../config/config.js';
import {
	insertUser,
	findUserByUsername
} from '../../../models/Schemas/userModel.js';
import bcrypt from 'bcryptjs';
import startLogger_handler, {
	loggedEventControl
} from '../../routes/route_handlers/logger_handlers.js';
import getRowsPacketUsers from '../../../models/Schemas/userModel.js';

const config = await getConfig();

async function logThisEvent(
	request: Request,
	response: Response
): Promise<void> {
	startLogger_handler(request, response);
	loggedEventControl();
}

async function indexHandler(req: Request, res: Response): Promise<void> {
	const index_script = `<script type="module" src="./ts/index.js" content="text/javascript"></script>`;
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('index', {
			// ...(await getConfig()),
			title: `MySQL Sandbox`,
			layout: 'main',
			helpers: 'helpers',
			script: [index_script],
			appName: config.applicationName
		});
		logThisEvent(req, res);
		getRowsPacketUsers();
	} catch (error: unknown) {
		console.error(`indexHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');
	}
}

async function registerHandler(req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('register', {
			...(await getConfig()),
			title: 'Register',
			layout: 'register_main',
			partials: 'partials',
			helpers: 'helpers'
		});
		logThisEvent(req, res);
	} catch (error: unknown) {
		console.error(`registerHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');
	}
}

async function registerPostHandler(req: Request, res: Response): Promise<void> {
	try {
		const errors: any = [];
		const { username, email, password, password2 } = req.body;
		await insertUser(username, email, password);
		if (!username || !email || !password || !password2) {
			errors.push({ msg: 'Please fill in all fields' });
		}

		if (password !== password2) {
			errors.push({ msg: 'Passwords do not match' });
		}

		if (password.length < 8) {
			errors.push({ msg: 'Password must be at least 8 characters' });
		}

		if (errors.length > 0) {
			res.render('register', {
				errors
			});
		} else {
			res.send('pass');
		}
		logThisEvent(req, res);
	} catch (error: unknown) {
		console.error(`registerPostHandler had an ERROR: ${error}`);
		res.status(500).send(`Post Register Error: ${error}`);
	}
}

async function loginHandler(req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('login', {
			...(await getConfig()),
			title: 'Login',
			layout: 'login_main',
			partials: 'partials',
			helpers: 'helpers'
		});
		logThisEvent(req, res);
	} catch (error: unknown) {
		console.error(`loginHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');
	}
}

async function loginPostHandler(
	req: Request,
	res: Response
): Promise<Response<any, Record<string, any>> | undefined> {
	try {
		const { username, password } = req.body;
		const user = await findUserByUsername(username);

		if (!user) {
			return res.status(400).send({ message: 'Invalid Credentials!' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send({ message: 'Invalid Credentials!' });
		}
		res.send({ message: 'Logged In!' });
		logThisEvent(req, res);
	} catch (error: unknown) {
		console.error(
			`loginPostHandler had an ERROR: ${(error as Error).message}`
		);
		res.status(500).send(`Post Login Error: ${(error as Error).message}`);
	}
}

async function aboutHandler(req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('about', {
			...(await getConfig()),
			title: 'About',
			layout: 'main',
			partials: 'partials',
			helpers: 'helpers'
		});
		logThisEvent(req, res);
	} catch (error: unknown) {
		console.error(`aboutHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');
	}
}

export {
	indexHandler as default,
	registerHandler,
	registerPostHandler,
	loginPostHandler,
	loginHandler,
	aboutHandler
};
