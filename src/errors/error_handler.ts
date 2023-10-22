'use strict';

class ErrorHandler extends Error {
	constructor(public status: number, message?: string) {
		super(message);
		this.status = status;
	}
}

export default ErrorHandler;
