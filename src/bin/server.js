'use strict';

import getConfig from '../../config/config.js';
import http from 'http';
import App from '../app.js';
import { Sequelize } from 'sequelize';
import { EventEmitter } from 'node:events';

const config = await getConfig();

const port = config.port || 9080;
const host = config.host;
const serverUrl = config.serverUrl;

const sequelize = new Sequelize(config.mysql.options);
function connectToMySQL() {
	sequelize
		.authenticate()
		.then(() => {
			console.log(
				'The MySQL connection has been established successfully.'
			);
		})
		.catch((error) => {
			console.error('Unable to connect to the MySQL database:', error);
			process.exit(1);
		});
	return sequelize;
}

const mysql = connectToMySQL();
config.client = mysql;

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
	} catch (error) {
		console.error(`Error in the turnOnListenerFunc() Function: ${error}`);
	}
}

function onError(error) {
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

async function onListening() {
	try {
		console.info(`onListening started`);

		setTimeout(() => {
			const server_address = server.address({
				port: config.port,
				host: config.host,
				family: 'IPv6',
				address: config.serverUrl
			});
			console.log(
				`server_address: ${config.host}:${server_address.port}`
			);

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
					'Server address is null. Ensure the server is started and listening.'
				);
			}
		}, 300);
	} catch (error) {
		console.error(`Error in onListening: ${error}`);
	}
}

async function ServerEmitter() {
	const serverEmitter = new EventEmitter();
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
		const parameters = args.join(', ');
		console.log(`event with parameters ${parameters} in third listener`);
	});

	console.log(serverEmitter.listeners('event'));

	serverEmitter.emit('event', 1, 2, 3, 4, 5);
}

export default sequelize;
