'use strict';

import getConfig from '../../config/config.js';
import http from 'http';
import App from '../app.js';
import { EventEmitter } from 'node:events';
import {
	Connection,
	createConnection,
	OkPacketParams,
	QueryError,
	RowDataPacket
} from 'mysql2/promise';
import { AddressInfo } from 'node:net';

const config = await getConfig();

const port: string | number = config.port || 9080;
const host: string = config.host;
const serverUrl: string = config.serverUrl;

const connection: Promise<Connection> = createConnection({
	host: config.mysql.options.host,
	user: config.mysql.options.username,
	password: config.mysql.options.password,
	database: config.mysql.options.database
});

async function startMySQLConnection(
	conn: Promise<Connection>
): Promise<Connection | undefined> {
	try {
		(await conn).connect();
		const user: Connection = (await conn).on('users', (...args) => {
			console.log(`The 'users' event has been emitted:`, ...args);
			return user.emit('users', ...args);
		});
		console.log(`Connected to MySQL as id ${(await conn).threadId}`);
		return user;
	} catch (error: any) {
		function catchError(result: OkPacketParams, rows: RowDataPacket[]) {
			const errors: QueryError = error;
			const catchResult = result.affectedRows;
			const solution = rows[0];

			if (error) {
				console.error(
					`Error connecting to MySQL: ${error}`,
					`The catch result is: ${catchResult}`,
					`The solution is: ${solution}`
				);
			} else {
				console.error(`Error connecting to MySQL: ${errors}`);
			}
		}
		// const clientQuery = await config.client.query('SELECT 1+1 AS solution');
		catchError({}, []);
	}
}

const mysqlConnection: Promise<Connection | undefined> =
	startMySQLConnection(connection);
config.client = mysqlConnection;

// Logic to start the server
const app = App(config);
const server = http.createServer(app);

await turnOnListenerFunc();

async function turnOnListenerFunc() {
	try {
		server.on('error', onError);
		server.listen(port, () => {
			console.info(`MySQL Sandbox Server is Listening at ${serverUrl}`);
		});
		onListening();
	} catch (error: unknown) {
		console.error(`Error in the turnOnListenerFunc() Function: ${error}`);
	}
}

function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = typeof port === 'string' ? `Pipe  ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
		default:
			throw error;
	}
}

async function onListening(): Promise<void> {
	try {
		console.info(`onListening started`);

		setTimeout(() => {
			const server_address: string | AddressInfo | null =
				server.address();
			if (server_address && typeof server_address !== 'string') {
				console.log(
					`server_address: ${config.host}:${
						(server_address as any).port
					}`
				);
			} else {
				console.log(`server_address: ${config.host}:${server_address}`);
			}

			if (server_address) {
				const bind =
					typeof server_address === 'string'
						? `pipe ${config.host}`
						: `port ${server_address.port}`;

				console.info(
					`Application Name:  ${config.applicationName} listening on ${bind}`
				);
				ServerEmitter();
			} else {
				console.error(
					`Server address is null @ host: ${host}. Ensure the server is started and listening.`
				);
			}
		}, 300);
	} catch (error: unknown) {
		console.error(`Error in onListening: ${error}`);
	}
}

async function ServerEmitter(): Promise<void> {
	const serverEmitter: EventEmitter = new EventEmitter();
	serverEmitter.on('foo', () => console.log('a'));
	serverEmitter.prependListener('foo', () => console.log('b'));
	serverEmitter.emit('foo');
	// First listener
	serverEmitter.on('event', function firstListener() {
		console.log('Hello! first listener');
	});
	// Second listener
	serverEmitter.on('event', function secondListener(arg1, arg2) {
		console.log(
			`event with parameters ${arg1}, ${arg2} in second listener`
		);
	});
	// Third listener
	serverEmitter.on('event', function thirdListener(...args) {
		const parameters: string = args.join(', ');
		console.log(`event with parameters ${parameters} in third listener`);
	});

	console.log(serverEmitter.listeners('event'));

	serverEmitter.emit('event', 1, 2, 3, 4, 5);
}
export { connection };
