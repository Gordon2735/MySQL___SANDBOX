'use strict';

import Logger from '../../log_controller/logging.js';

const logger = new Logger();

// Initial route to trigger the logger events.
const startLogger_handler = (req, res) => {
	const eventName = 'customEvent';
	const eventData = { message: 'Start Event has been Logged!' };

	// Log the Event
	logger.logEvent(eventName, eventData);

	res.send('Event Logged!');
};

// Control the logged event emitted by the logger.
function loggedEventControl() {
	logger.on('logged', (logEntry) => {
		console.info(
			`Logged Event: ${logEntry.event} at ${logEntry.timestamp}`
		);
	});
}

export { startLogger_handler as default, loggedEventControl };
