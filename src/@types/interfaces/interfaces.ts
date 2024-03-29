'use strict';

import { RowDataPacket } from 'mysql2';
import { SessionData } from 'express-session';

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

// interface SessionData {
// 	user: any;
// }

interface Session {
	data: SessionData;
	views: number;
	session_id: Session & Partial<SessionData>;
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

// Define a custom type that extends the Express SessionData interface

export {
	IUser as default,
	PopoverElement,
	ButtonElementWithPopover,
	SessionData,
	Session,
	IConfig
};
