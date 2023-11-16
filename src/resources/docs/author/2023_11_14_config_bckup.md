```ts
'use strict';

import dotenv from 'dotenv';
import fs from 'fs';
import IConfig from '../src/@types/interfaces/interfaces.js';

// Load environment variables from .env file
dotenv.config({
	path: './config/.env'
});

const pkg: IConfig = JSON.parse(fs.readFileSync('package.json', 'utf8'));

async function getConfig(): Promise<{
	applicationName: string;
	port: string | number;
	host: string;
	session_key: string | undefined;
	mysql: {
		options: {
			host: string;
			port: number;
			database: string;
			user: string;
			password: string;
			waitForConnections: true;
			queueLimit: 10;
		};
	};
	sessions: {
		sessionid: string;
		user_id: string;
		secretkey: string;
		userid: string;
		session: string;
		cookie: string;
	};
	readonly serverUrl: string;
	client: any;
	user: {
		options: {
			id: string;
			username: string;
			email: string;
			password: string;
		};
	};
}> {
	// Return configuration object
	return {
		applicationName: pkg.name,
		port: process.env.PORT || 9080,
		host: process.env.HOST || '127.0.0.1',
		session_key: process.env.SESSION_KEY,
		mysql: {
			options: {
				host: process.env.HOST || '',
				port: 3306,
				database: 'team_webelistics',
				user: 'webelistics',
				password: 'jOhn338@mAt2819@',
				waitForConnections: true,
				queueLimit: 10
			}
		},
		sessions: {
			sessionid: '',
			user_id: '',
			secretkey: '',
			userid: '',
			session: '',
			cookie: ''
		},
		get serverUrl(): string {
			return `http://${process.env.HOST}:${process.env.PORT}`;
		},
		client: null,
		user: {
			options: {
				id: '',
				username: '',
				email: '',
				password: ''
			}
		}
	};
}
export default getConfig;
```
