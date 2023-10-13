'use strict';

import getConfig from '../../config/config.js';
import http from 'http';
import App from '../app.js';
import { Sequelize } from 'sequelize';

const config = await getConfig();

console.info(getConfig());
console.info('config.applicationName: ', config.applicationName);

const PORT = config.port;
const HOST = config.host;
const serverUrl = config.serverUrl;

function connectToMySQL() {
	const sequelize = new Sequelize(config.mysql.options);

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
app.set('port', PORT);
app.set('host', HOST);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = typeof PORT === 'string' ? `Pipe  ${PORT}` : `Port ${PORT}`;

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

const server = http.createServer(app);

function onListening() {
	const address = server.address();
	const bind =
		typeof address === 'string'
			? `pipe ${address}`
			: `port ${address.port}`;

	console.info(`${config.applicationName} listening on ${bind}`);
}
server.on('error', onError);
server.on('listening', onListening, () => {
	console.log(
		`
			Server is listening on port ${PORT},
			Open your browser on ${serverUrl}/,
			Press Ctrl+C to quit.

			On Listening: ${onListening}
		`
	);
});
