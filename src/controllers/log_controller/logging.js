'use strict';

import { EventEmitter } from 'node:events';
import * as fs from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger extends EventEmitter {
	constructor() {
		super();

		this.logFilePath = path.join(
			__dirname,
			'..',
			'..',
			'..',
			'logs',
			'/event_logs',
			'/event_logs.json'
		);
		this.logData = [];
		this.loadLogData();
	}

	async loadLogData() {
		try {
			const data = fs.readFile(this.logFilePath, 'utf8');
			this.logData = JSON.parse(data);
		} catch (error) {
			console.info(
				`
                    Error in class method loadLogData()
                     when loading log data: ${error}
                `
			);
			return;
		}
	}

	async logEvent(eventName, eventData) {
		const logEntry = {
			id: uuid4(), //Generate a unique ID
			timestamp: new Date().toISOString(),
			event: await eventName,
			data: await eventData
		};
		this.logData.push(logEntry);
		this.emit('logged', logEntry);

		// Write log data to the file
		await writeFile(
			this.logFilePath,
			JSON.stringify(this.logData),
			null,
			2
		);
	}
}
export default Logger;
