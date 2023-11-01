'use strict';

import getConfig from '../../config/config.js';
import { Application } from 'express';
import { connection } from '../models/databases/mysqlDB.js';
import {
	createPool,
	Pool,
	PoolConnection,
	RowDataPacket,
	ResultSetHeader,
	ProcedureCallPacket
} from 'mysql2/promise';
import http from 'http';
import App from '../app.js';
// import { EventEmitter } from 'node:events';
import { AddressInfo } from 'node:net';

const config = await getConfig();

const port: string | number = config.port || 9080;
const host: string = config.host;
const serverUrl: string = config.serverUrl;

const pool: Pool = createPool(config.mysql.options);

async function executeMysqlQuery<
	T extends
		| RowDataPacket[]
		| ResultSetHeader
		| RowDataPacket[][]
		| ProcedureCallPacket = RowDataPacket[]
>(query: string, values?: any[] | null): Promise<T> {
	// let conn: PoolConnection | null = null;
	let conn: PoolConnection = await pool.getConnection();
	try {
		const [rows] = await conn.execute<T>(query, values);
		return rows;
	} catch (error: unknown) {
		console.error(`Error in executeMysqlQuery: ${error}`);
		// throw error as any as unknown;
		return Promise.reject(error);
	} finally {
		if (conn) {
			conn.release();
		}
	}
}

// Logic to start the server
const app: Application = App(config);
const server: http.Server<
	typeof http.IncomingMessage,
	typeof http.ServerResponse
> = http.createServer(app);

await turnOnListener();

async function turnOnListener() {
	try {
		server.on('error', onError);
		server.listen(port, () => {
			console.info(`MySQL Sandbox Server is Listening at ${serverUrl}`);
		});
		onListening();
		// await startMysqlConnection();
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
				// ServerEmitter();
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

// async function ServerEmitter(): Promise<void> {
// 	const serverEmitter: EventEmitter = new EventEmitter();
// 	serverEmitter.on('foo', () => console.log('a'));
// 	serverEmitter.prependListener('foo', () => console.log('b'));
// 	serverEmitter.emit('foo');
// 	// First listener
// 	serverEmitter.on('event', function firstListener() {
// 		console.log('Hello! first listener');
// 	});
// 	// Second listener
// 	serverEmitter.on('event', function secondListener(arg1, arg2) {
// 		console.log(
// 			`event with parameters ${arg1}, ${arg2} in second listener`
// 		);
// 	});
// 	// Third listener
// 	serverEmitter.on('event', function thirdListener(...args) {
// 		const parameters: string = args.join(', ');
// 		console.log(`event with parameters ${parameters} in third listener`);
// 	});

// 	console.log(serverEmitter.listeners('event'));

// 	serverEmitter.emit('event', 1, 2, 3, 4, 5);
// }
export { connection as default, executeMysqlQuery };
