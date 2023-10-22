'use strict';

import { Request, Response } from 'express';
import Logger from '../../log_controller/logging.js';

const logger: Logger = new Logger();

// Initial route to trigger the logger events.
const startLogger_handler = (_req: Request, res: Response): void => {
	const eventName: 'customEvent' = 'customEvent';
	const eventData: {
		message: string;
	} = { message: 'Start Event has been Logged!' };

	// Log the Event
	logger.logEvent(eventName, eventData);

	res.send('Event Logged!');
};

// Control the logged event emitted by the logger.
function loggedEventControl(): void {
	logger.on('logged', (logEntry) => {
		console.info(
			`Logged Event: ${logEntry.event} at ${logEntry.timestamp}`
		);
	});
}

export { startLogger_handler as default, loggedEventControl };
