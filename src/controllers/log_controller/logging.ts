'use strict';

import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger extends EventEmitter {
	logFilePath: string;
	logData: any[];
	constructor() {
		super();

		this.logFilePath = path.join(
			__dirname,
			'../../../logs/event_logs',
			'event_logs.json'
		);
		this.logData = [];
		this.loadLogData();
	}

	async loadLogData() {
		try {
			const data: string = fs.readFileSync(this.logFilePath, {
				encoding: 'utf8',
				flag: 'r'
			});
			this.logData = JSON.parse(data);
		} catch (error: unknown) {
			this.logData = [];
		}
	}

	logEvent(eventName: string, eventData: { message: string }) {
		const logEntry: {
			id: string;
			timestamp: string;
			event: string;
			data: {
				message: string;
			};
		} = {
			id: uuid4(), //Generate a unique ID
			timestamp: new Date().toISOString(),
			event: eventName,
			data: eventData
		};
		this.logData.push(logEntry);
		this.emit('logged', logEntry);

		// Write log data to the file
		fs.writeFileSync(
			this.logFilePath,
			JSON.stringify(this.logData, null, 2)
		);
	}
}
export default Logger;
