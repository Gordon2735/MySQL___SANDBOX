'use strict';

import getConfig from '../../config/config.js';
import { Application } from 'express';
import { connection } from '../models/databases/mysqlDB.js';
import http from 'http';
import App from '../app.js';
import { AddressInfo } from 'node:net';

const config = await getConfig();

const port: string | number = config.port || 9080;
const host: string = config.host;
const serverUrl: string = config.serverUrl;

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

export { connection as default };
