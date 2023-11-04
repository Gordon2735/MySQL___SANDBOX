'use strict';

import { RowDataPacket } from 'mysql2';

interface IUser extends RowDataPacket {
	id?: number;
	username: string;
	password: string;
	admin: boolean;
	email: string;
	avatar: string;
	role: number;
	status: number;
	createdAt: Date;
	updatedAt: Date;
}

interface PopoverElement extends HTMLElement {
	toggle?(): void;
}

interface ButtonElementWithPopover extends HTMLButtonElement {
	popoverContent?: PopoverElement;
}

interface SessionData {
	user: any;
}

interface IConfig {
	applicationName: string;
	port: string | number;
	host: string;
	mysql: {
		options: {
			host: string;
			port: number;
			database: string;
			user: string;
			password: string;
			waitForConnections: true;
			queueLimit: 10;
		};
	};
	readonly serverUrl: string;
	client: any;
	user: {
		options: {
			id: string;
			username: string;
			email: string;
			password: string;
		};
	};
}

export {
	IUser as default,
	PopoverElement,
	ButtonElementWithPopover,
	SessionData,
	IConfig
};
